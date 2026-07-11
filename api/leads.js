import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, company, service, budget, projectDetails } = req.body;

    // 1. Validate required fields
    if (!name || !email || !service || !projectDetails) {
      console.error('API Failure: Missing required fields');
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // 2. Generate Lead ID
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0].replace(/-/g, ''); // YYYYMMDD
    const randomThree = Math.floor(Math.random() * 900) + 100; // 100-999
    const leadId = `KKT-${dateStr}-${randomThree}`;
    const timestamp = today.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });

    console.log(`Lead Created: ${leadId} for ${email}`);

    const leadData = {
      leadId,
      timestamp,
      name,
      company: company || 'N/A',
      email,
      phone: phone || 'N/A',
      service,
      budget: budget || 'N/A',
      projectDetails,
      status: 'New Lead',
      source: 'Website'
    };

    // 3. Save to Google Sheets
    if (process.env.GOOGLE_APPS_SCRIPT_URL) {
      try {
        const gsRes = await fetch(process.env.GOOGLE_APPS_SCRIPT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leadData)
        });
        if (!gsRes.ok) throw new Error(`Google Apps Script returned status ${gsRes.status}`);
        console.log(`Google Sheet Success: ${leadId}`);
      } catch (gsError) {
        console.error(`Google Sheet Failure: ${leadId}`, gsError);
        // Do not crash, continue workflow
      }
    } else {
      console.warn(`Google Sheet Failure: No GOOGLE_APPS_SCRIPT_URL configured.`);
    }

    // 4 & 5. Dispatch Emails
    if (process.env.RESEND_API_KEY) {
      const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';
      const internalEmail = process.env.INTERNAL_SALES_EMAIL || 'hello@kktechsolutions.in';
      const companyName = process.env.COMPANY_NAME || 'KK Tech Solutions';
      const websiteUrl = process.env.WEBSITE_URL || 'https://kktechsolutions.in';

      const internalHtml = `
        <div style="font-family: sans-serif; max-width: 600px; padding: 20px;">
          <h2>🚀 New Lead Received</h2>
          <table style="width: 100%; border-collapse: collapse; text-align: left;">
            <tr><th style="padding: 8px; border-bottom: 1px solid #ccc;">Lead ID</th><td style="padding: 8px; border-bottom: 1px solid #ccc;">${leadId}</td></tr>
            <tr><th style="padding: 8px; border-bottom: 1px solid #ccc;">Date</th><td style="padding: 8px; border-bottom: 1px solid #ccc;">${timestamp}</td></tr>
            <tr><th style="padding: 8px; border-bottom: 1px solid #ccc;">Name</th><td style="padding: 8px; border-bottom: 1px solid #ccc;">${name}</td></tr>
            <tr><th style="padding: 8px; border-bottom: 1px solid #ccc;">Company</th><td style="padding: 8px; border-bottom: 1px solid #ccc;">${leadData.company}</td></tr>
            <tr><th style="padding: 8px; border-bottom: 1px solid #ccc;">Email</th><td style="padding: 8px; border-bottom: 1px solid #ccc;">${email}</td></tr>
            <tr><th style="padding: 8px; border-bottom: 1px solid #ccc;">Phone</th><td style="padding: 8px; border-bottom: 1px solid #ccc;">${leadData.phone}</td></tr>
            <tr><th style="padding: 8px; border-bottom: 1px solid #ccc;">Service</th><td style="padding: 8px; border-bottom: 1px solid #ccc;">${service}</td></tr>
            <tr><th style="padding: 8px; border-bottom: 1px solid #ccc;">Budget</th><td style="padding: 8px; border-bottom: 1px solid #ccc;">${leadData.budget}</td></tr>
          </table>
          <h3 style="margin-top: 20px;">Project Details</h3>
          <p style="background: #f4f4f5; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${projectDetails}</p>
        </div>
      `;

      const customerHtml = `
        <div style="font-family: 'Inter', -apple-system, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0b121f; color: #ffffff; padding: 40px; border-radius: 16px; border: 1px solid #1e293b;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h2 style="color: #3b82f6; font-size: 28px; margin: 0; font-weight: 800; letter-spacing: -1px;">${companyName}</h2>
            <p style="color: #94a3b8; font-size: 14px; margin-top: 4px;">Enterprise IT Infrastructure & Cloud Services</p>
          </div>
          
          <p style="font-size: 16px; color: #94a3b8; margin-bottom: 24px;">Hi ${name},</p>
          
          <div style="background: linear-gradient(135deg, rgba(59,130,246,0.1), rgba(6,182,212,0.1)); border: 1px solid rgba(59,130,246,0.2); padding: 24px; border-radius: 12px; margin-bottom: 32px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">Request Received</h1>
            <p style="margin: 12px 0 0; font-size: 16px; color: #bae6fd; font-weight: 500;">Thank you for contacting us. We're reviewing your requirements.</p>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px; background: rgba(255,255,255,0.02); border-radius: 8px;">
            <tr>
              <td style="padding: 16px; border-bottom: 1px solid #1e293b; color: #94a3b8; width: 40%;">Reference ID</td>
              <td style="padding: 16px; border-bottom: 1px solid #1e293b; color: #f8fafc; font-weight: 600; font-family: monospace;">${leadId}</td>
            </tr>
            <tr>
              <td style="padding: 16px; border-bottom: 1px solid #1e293b; color: #94a3b8;">Requested Service</td>
              <td style="padding: 16px; border-bottom: 1px solid #1e293b; color: #f8fafc; font-weight: 500;">${service}</td>
            </tr>
            <tr>
              <td style="padding: 16px; color: #94a3b8;">Expected Response Time</td>
              <td style="padding: 16px; color: #3b82f6; font-weight: 600;">Within 24 Business Hours</td>
            </tr>
          </table>

          <div style="background-color: #0f172a; border-left: 4px solid #3b82f6; padding: 20px; border-radius: 8px; margin-bottom: 32px;">
            <p style="margin: 0; font-size: 14px; color: #cbd5e1; line-height: 1.6;">
              <strong>What's Next?</strong> Our enterprise architects are carefully reviewing your project details. A dedicated specialist will be in touch shortly via email or phone to discuss your custom solution.
            </p>
          </div>

          <div style="border-top: 1px solid #1e293b; padding-top: 24px; text-align: center;">
            <div style="font-size: 13px; color: #64748b; line-height: 1.6;">
              <strong>${companyName}</strong><br>
              <a href="${websiteUrl}" style="color: #3b82f6; text-decoration: none;">${websiteUrl}</a>
            </div>
          </div>
        </div>
      `;

      try {
        await Promise.all([
          resend.emails.send({
            from: `${companyName} <${fromEmail}>`,
            to: internalEmail,
            subject: `🚀 New Lead Received - ${companyName} (${leadId})`,
            html: internalHtml,
          }),
          resend.emails.send({
            from: `${companyName} <${fromEmail}>`,
            to: email,
            subject: `Thank You For Contacting ${companyName}`,
            html: customerHtml,
          })
        ]);
        console.log(`Internal Email Sent: ${leadId}`);
        console.log(`Customer Email Sent: ${leadId}`);
      } catch (emailError) {
        console.error(`Resend Failure: ${leadId}`, emailError);
      }
    } else {
      console.warn(`Resend Failure: No RESEND_API_KEY configured.`);
    }

    // 6. Return JSON response
    return res.status(200).json({ success: true, leadId });

  } catch (error) {
    console.error('API Failure:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
