import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

async function testEmail() {
  console.log("Using API Key:", process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY.substring(0, 10) + '...' : 'NONE');
  console.log("From:", process.env.FROM_EMAIL);
  
  try {
    const data = await resend.emails.send({
      from: `Test <${process.env.FROM_EMAIL || 'onboarding@resend.dev'}>`,
      to: 'umang@kktechsolutions.in',
      subject: 'Test Email',
      html: '<p>This is a test</p>'
    });
    console.log("Success:", data);
  } catch (error) {
    console.error("Error:", error);
  }
}

testEmail();
