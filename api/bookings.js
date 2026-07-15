import { Resend } from 'resend';
import supabase from './db-client.js';
import * as ics from 'ics';
import crypto from 'crypto';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key');

// Helper to send admin alerts on subsystem failure
async function sendAdminAlert(errorType, message, details = {}) {
  if (!process.env.RESEND_API_KEY) return;
  try {
    const internalEmail = process.env.INTERNAL_SALES_EMAIL || 'hello@kktechsolutions.in';
    const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';
    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });

    await resend.emails.send({
      from: `System Alerts <${fromEmail}>`,
      to: internalEmail,
      subject: `🚨 [KK TECH ALERT] Lead Submission Failure Detected`,
      html: `<div style="font-family: sans-serif; padding: 20px;">
               <h2 style="color: #dc2626;">Subsystem Failure Alert</h2>
               <table style="width: 100%; text-align: left; border-collapse: collapse;">
                 <tr><th style="padding: 8px; border-bottom: 1px solid #ccc;">Timestamp</th><td style="padding: 8px; border-bottom: 1px solid #ccc;">${timestamp}</td></tr>
                 <tr><th style="padding: 8px; border-bottom: 1px solid #ccc;">Error Type</th><td style="padding: 8px; border-bottom: 1px solid #ccc;">${errorType}</td></tr>
                 <tr><th style="padding: 8px; border-bottom: 1px solid #ccc;">Service Selected</th><td style="padding: 8px; border-bottom: 1px solid #ccc;">${details.service || 'N/A'}</td></tr>
                 <tr><th style="padding: 8px; border-bottom: 1px solid #ccc;">User Details</th><td style="padding: 8px; border-bottom: 1px solid #ccc;">${details.email || 'N/A'} (${details.name || 'N/A'})</td></tr>
               </table>
               <h3 style="margin-top: 20px;">Error Message</h3>
               <p style="background: #f4f4f5; padding: 15px; border-radius: 5px; color: #dc2626;">${message}</p>
               <hr />
               <p style="font-size: 12px; color: #666;">KK Tech Solutions Automated Monitoring</p>
             </div>`
    });
  } catch (err) {
    console.error('[Admin Alert Error] Failed to send alert:', err);
  }
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      if (!supabase) {
        console.warn('[Supabase Warning] Client not initialized. Returning empty booked slots.');
        return res.status(200).json({ success: true, bookedSlots: [] });
      }

      // Fetch all booked slots
      const { data, error } = await supabase
        .from('bookings')
        .select('date, time')
        .neq('status', 'Cancelled');

      if (error) {
        console.error('[Supabase Error] fetch error:', error);
        return res.status(500).json({ error: 'Failed to fetch availability' });
      }

      return res.status(200).json({ success: true, bookedSlots: data || [] });
    } catch (error) {
      console.error('[API Error] GET Failure:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { name, email, phone, company, service, budget, projectDetails, date, time } = req.body;

      if (!name || !email || !service || !projectDetails || !date || !time) {
        console.error('[Validation Error] Missing required fields');
        return res.status(400).json({ error: 'Missing required fields' });
      }

      let isSupabaseSuccess = false;
      let isSheetSuccess = false;
      let isEmailSuccess = false;
      let bookingData = null;

      // 1. Insert into Supabase with Date & Time locking
      if (supabase) {
        try {
          const { data, error: insertError } = await supabase
            .from('bookings')
            .insert([{
              name, email, phone: phone || 'N/A', company: company || 'N/A',
              service, budget: budget || 'N/A', project_details: projectDetails,
              date, time, status: 'Confirmed'
            }])
            .select()
            .single();

          if (insertError) {
            if (insertError.code === '23505') {
              console.warn(`[Race Condition] Avoided: ${date} ${time} already booked.`);
              return res.status(409).json({ error: 'This time slot has just been booked. Please select another available time.' });
            }
            console.error('[Supabase Error] Insert failed:', insertError);
            sendAdminAlert(
              '[Supabase] Booking Database Insert Failed',
              `Supabase failed to insert booking for <b>${email}</b> at ${date} ${time}.<br>Error: ${insertError.message}`,
              { service, email, name }
            );
          } else {
            bookingData = data;
            isSupabaseSuccess = true;
          }
        } catch (dbErr) {
          console.error('[Supabase Error] Exception during insert:', dbErr);
          sendAdminAlert(
            '[Supabase] Booking Database Exception',
            `An exception occurred while inserting booking for <b>${email}</b> at ${date} ${time}.<br>Error: ${dbErr.message}`,
            { service, email, name }
          );
        }
      } else {
        console.warn('[Supabase Warning] Client not initialized, skipping insert.');
      }

      // 2. Generate Lead ID
      const today = new Date();
      const year = today.getFullYear();
      const uniqueHex = crypto.randomBytes(2).toString('hex').toUpperCase();
      const leadId = `KKT-${year}-${uniqueHex}`;
      const timestamp = today.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });

      console.log(`[Booking] Processing Lead ID: ${leadId} for ${email}`);

      const leadData = {
        leadId, timestamp, name, company: company || 'N/A', email,
        phone: phone || 'N/A', service, budget: budget || 'N/A', projectDetails,
        date, time, status: 'Confirmed', source: 'Website'
      };

      // 3. Save to Google Sheets as Backup
      if (process.env.GOOGLE_APPS_SCRIPT_URL) {
        try {
          const gsRes = await fetch(process.env.GOOGLE_APPS_SCRIPT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(leadData)
          });
          if (!gsRes.ok) throw new Error(`Google Apps Script returned status ${gsRes.status}`);
          isSheetSuccess = true;
          console.log(`[Google Sheets Success] Recorded ${leadId}`);
        } catch (gsError) {
          console.error(`[Google Sheets Error] Failure recording ${leadId}:`, gsError);
          sendAdminAlert(
            '[Google Sheets] Backup Sync Failed',
            `Google Sheets failed to sync lead <b>${leadId}</b> (${email}).<br>Error: ${gsError.message}`,
            { service, email, name }
          );
        }
      } else {
        console.warn('[Google Sheets Warning] URL not configured.');
      }

      // 4. Create ICS Event
      const [year, month, day] = date.split('-').map(Number);
      const timeMatch = time.match(/(\d+):(\d+)\s+(AM|PM)/i);
      let hour = 9, minute = 0;
      
      if (timeMatch) {
        hour = parseInt(timeMatch[1], 10);
        minute = parseInt(timeMatch[2], 10);
        const ampm = timeMatch[3].toUpperCase();
        if (ampm === 'PM' && hour < 12) hour += 12;
        if (ampm === 'AM' && hour === 12) hour = 0;
      }

      const event = {
        start: [year, month, day, hour, minute],
        duration: { hours: 1, minutes: 0 },
        title: 'Consultation with KK Tech Solutions',
        description: `Consultation regarding ${service} for ${company || name}.\n\nDetails: ${projectDetails}`,
        location: 'Google Meet / Zoom (Link to follow)',
        url: 'https://kktechsolutions.in',
        geo: { lat: 23.0225, lon: 72.5714 },
        categories: ['Consultation', 'Meeting'],
        status: 'CONFIRMED',
        busyStatus: 'BUSY',
        organizer: { name: 'KK Tech Solutions', email: 'hello@kktechsolutions.in' },
        attendees: [{ name, email, rsvp: true, partstat: 'ACCEPTED', role: 'REQ-PARTICIPANT' }]
      };

      let icsContent = '';
      ics.createEvent(event, (error, value) => {
        if (!error) icsContent = value;
      });

      // 5. Dispatch Emails
      if (process.env.RESEND_API_KEY) {
        const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';
        const internalEmail = process.env.INTERNAL_SALES_EMAIL || 'hello@kktechsolutions.in';
        const companyName = process.env.COMPANY_NAME || 'KK Tech Solutions';
        const websiteUrl = process.env.WEBSITE_URL || 'https://kktechsolutions.in';

        const internalHtml = `
          <div style="font-family: sans-serif; max-width: 600px; padding: 20px;">
            <h2>🚀 New Consultation Scheduled</h2>
            <table style="width: 100%; border-collapse: collapse; text-align: left;">
              <tr><th style="padding: 8px; border-bottom: 1px solid #ccc;">Date & Time</th><td style="padding: 8px; border-bottom: 1px solid #ccc;"><b>${date} at ${time}</b></td></tr>
              <tr><th style="padding: 8px; border-bottom: 1px solid #ccc;">Lead ID</th><td style="padding: 8px; border-bottom: 1px solid #ccc;">${leadId}</td></tr>
              <tr><th style="padding: 8px; border-bottom: 1px solid #ccc;">Name</th><td style="padding: 8px; border-bottom: 1px solid #ccc;">${name}</td></tr>
              <tr><th style="padding: 8px; border-bottom: 1px solid #ccc;">Company</th><td style="padding: 8px; border-bottom: 1px solid #ccc;">${company || 'N/A'}</td></tr>
              <tr><th style="padding: 8px; border-bottom: 1px solid #ccc;">Email</th><td style="padding: 8px; border-bottom: 1px solid #ccc;">${email}</td></tr>
              <tr><th style="padding: 8px; border-bottom: 1px solid #ccc;">Phone</th><td style="padding: 8px; border-bottom: 1px solid #ccc;">${phone || 'N/A'}</td></tr>
              <tr><th style="padding: 8px; border-bottom: 1px solid #ccc;">Service</th><td style="padding: 8px; border-bottom: 1px solid #ccc;">${service}</td></tr>
              <tr><th style="padding: 8px; border-bottom: 1px solid #ccc;">Budget</th><td style="padding: 8px; border-bottom: 1px solid #ccc;">${budget || 'N/A'}</td></tr>
            </table>
            <h3 style="margin-top: 20px;">Project Details</h3>
            <p style="background: #f4f4f5; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${projectDetails}</p>
          </div>
        `;

        const customerHtml = `
          <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; background-color: #0b1116; color: #ffffff; padding: 40px; border-radius: 12px; border: 1px solid #1a232c;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h2 style="color: #3b82f6; font-size: 28px; margin: 0; font-weight: 800; letter-spacing: -1px;">${companyName}</h2>
              <p style="color: #a1a1aa; font-size: 14px; margin-top: 4px;">Enterprise IT Infrastructure & Cloud Services</p>
            </div>
            
            <p style="font-size: 16px; color: #a1a1aa; margin-bottom: 24px;">Hi ${name},</p>
            
            <div style="background: linear-gradient(135deg, #2563eb, #06b6d4); padding: 24px; border-radius: 8px; margin-bottom: 32px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">Your Consultation is Confirmed</h1>
              <p style="margin: 12px 0 0; font-size: 18px; color: #e0f2fe; font-weight: 500;">🗓️ ${date} at ${time}</p>
            </div>

            <h2 style="font-size: 18px; color: #f4f4f5; margin-bottom: 16px; border-bottom: 1px solid #27272a; padding-bottom: 8px;">Consultation Details</h2>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #27272a; color: #a1a1aa; width: 40%;">Selected Solution</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #27272a; color: #f4f4f5; font-weight: 500;">${service}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #27272a; color: #a1a1aa;">Estimated Budget</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #27272a; color: #f4f4f5; font-weight: 500;">${budget || 'N/A'}</td>
              </tr>
            </table>

            <div style="background-color: #18181b; border-left: 4px solid #3b82f6; padding: 16px; border-radius: 4px; margin-bottom: 32px;">
              <p style="margin: 0; font-size: 14px; color: #d4d4d8; line-height: 1.5;">
                <strong>What's Next?</strong> Our enterprise architects are reviewing your requirements. We will contact you shortly to finalize the meeting details. A calendar invite has been attached to this email.
              </p>
            </div>
            
            <div style="border-top: 1px solid #27272a; padding-top: 24px; text-align: center;">
              <div style="font-size: 13px; color: #64748b; line-height: 1.6;">
                <strong>${companyName}</strong><br>
                <a href="${websiteUrl}" style="color: #3b82f6; text-decoration: none;">${websiteUrl}</a>
              </div>
            </div>
          </div>
        `;

        const attachments = [];
        if (icsContent) {
          attachments.push({
            filename: 'consultation.ics',
            content: Buffer.from(icsContent).toString('base64'),
            content_type: 'text/calendar'
          });
        }

        try {
          await Promise.all([
            resend.emails.send({
              from: `${companyName} <${fromEmail}>`,
              to: internalEmail,
              subject: `📅 New Consultation Scheduled - ${companyName} (${leadId})`,
              html: internalHtml,
            }),
            resend.emails.send({
              from: `${companyName} <${fromEmail}>`,
              to: email,
              subject: `Consultation Confirmed - ${companyName}`,
              html: customerHtml,
              attachments
            })
          ]);
          console.log(`[Email Success] Emails Sent for: ${leadId}`);
          isEmailSuccess = true;
        } catch (emailError) {
          console.error(`[Email Error] Resend Failure for ${leadId}:`, emailError);
          sendAdminAlert(
            '[Email] Customer Confirmation Failed',
            `Failed to send confirmation emails for lead <b>${leadId}</b> (${email}).<br>Error: ${emailError.message}`,
            { service, email, name }
          );
        }
      } else {
        console.warn('[Email Warning] RESEND_API_KEY not configured.');
      }

      if (!isSupabaseSuccess && !isSheetSuccess && !isEmailSuccess) {
        console.error(`[Critical Failure] Booking ${leadId} could not be saved to any system.`);
        return res.status(500).json({ error: 'Critical system failure. Could not save booking.' });
      }

      // 6. Return JSON response
      return res.status(200).json({ success: true, leadId });

    } catch (error) {
      console.error('[API Error] POST Failure:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
