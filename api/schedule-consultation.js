import { Resend } from 'resend';
import * as ics from 'ics';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { selectedOption, service, budget, name, email, company, date, time } = req.body;
    const finalService = selectedOption || service;

    if (!finalService || !budget || !name || !email || !date || !time) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Parse date and time to create ICS event
    // Assuming date is in format "YYYY-MM-DD" and time is "11:00 AM"
    const [year, month, day] = date.split('-').map(Number);
    
    // Parse time like "11:00 AM" to 24h format
    const timeMatch = time.match(/(\d+):(\d+)\s+(AM|PM)/i);
    let hour = 9;
    let minute = 0;
    
    if (timeMatch) {
      hour = parseInt(timeMatch[1], 10);
      minute = parseInt(timeMatch[2], 10);
      const ampm = timeMatch[3].toUpperCase();
      
      if (ampm === 'PM' && hour < 12) hour += 12;
      if (ampm === 'AM' && hour === 12) hour = 0;
    }

    // Generate ICS event
    const event = {
      start: [year, month, day, hour, minute],
      duration: { hours: 1, minutes: 0 },
      title: 'Consultation with KK Tech Solutions',
      description: `Consultation regarding ${finalService} for ${company || name}.`,
      location: 'Google Meet / Zoom (Link to follow)',
      url: 'https://kktechsolutions.in',
      geo: { lat: 23.0225, lon: 72.5714 },
      categories: ['Consultation', 'Meeting'],
      status: 'CONFIRMED',
      busyStatus: 'BUSY',
      organizer: { name: 'KK Tech Solutions', email: 'hello@kktechsolutions.in' },
      attendees: [
        { name, email, rsvp: true, partstat: 'ACCEPTED', role: 'REQ-PARTICIPANT' }
      ]
    };

    let icsContent = '';
    ics.createEvent(event, (error, value) => {
      if (error) {
        console.error('ICS Error:', error);
      } else {
        icsContent = value;
      }
    });

    const emailHtml = `
      <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; background-color: #0b1116; color: #ffffff; padding: 40px; border-radius: 12px; border: 1px solid #1a232c;">
        
        <!-- Header Logo -->
        <div style="text-align: center; margin-bottom: 30px;">
          <h2 style="color: #3b82f6; font-size: 28px; margin: 0; font-weight: 800; letter-spacing: -1px;">KK Tech Solutions</h2>
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
            <td style="padding: 12px 0; border-bottom: 1px solid #27272a; color: #f4f4f5; font-weight: 500;">${finalService}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #27272a; color: #a1a1aa;">Estimated Budget</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #27272a; color: #f4f4f5; font-weight: 500;">${budget}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #27272a; color: #a1a1aa;">Company Name</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #27272a; color: #f4f4f5; font-weight: 500;">${company || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #27272a; color: #a1a1aa;">Your Contact Email</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #27272a; color: #f4f4f5; font-weight: 500;">${email}</td>
          </tr>
        </table>

        <div style="background-color: #18181b; border-left: 4px solid #3b82f6; padding: 16px; border-radius: 4px; margin-bottom: 32px;">
          <p style="margin: 0; font-size: 14px; color: #d4d4d8; line-height: 1.5;">
            <strong>What's Next?</strong> Our enterprise architects are reviewing your requirements. We will contact you shortly to finalize the meeting details. A calendar invite has been attached to this email.
          </p>
        </div>

        <!-- Footer -->
        <div style="border-top: 1px solid #27272a; padding-top: 24px; text-align: center;">
          <p style="font-size: 14px; color: #71717a; margin: 0 0 16px;">
            Thank you for choosing KK Tech Solutions.<br>
            We look forward to speaking with you!
          </p>
          <div style="font-size: 12px; color: #52525b; line-height: 1.6;">
            <strong>KK Tech Solutions HQ</strong><br>
            715, Shilp Arista, Sindhu Bhawan Road, Ahmedabad<br>
            📞 +91 91739 12345 | ✉️ hello@kktechsolutions.in<br>
            <a href="https://kktechsolutions.in" style="color: #3b82f6; text-decoration: none;">www.kktechsolutions.in</a>
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
    
    // Check if API key is real before actually sending, to prevent crash if not set
    if (!process.env.RESEND_API_KEY) {
      console.log('MOCK SENDING EMAIL (NO API KEY FOUND):', { to: email, subject: 'Consultation Confirmed' });
      return res.status(200).json({ success: true, mocked: true });
    }

    const data = await resend.emails.send({
      from: 'KK Tech Solutions <onboarding@resend.dev>', // Use onboarding default for testing, user needs to verify domain to use custom
      to: email,
      subject: 'Consultation Confirmed - KK Tech Solutions',
      html: emailHtml,
      attachments
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to process request' });
  }
}
