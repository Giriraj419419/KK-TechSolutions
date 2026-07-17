import { Resend } from 'resend';
const resend = new Resend('re_C3WkEd7V_ApS5XhzjWFKJBxFC1Wton9Gs');

async function testEmail() {
  const attachments = [];
  const icsContent = "BEGIN:VCALENDAR\nEND:VCALENDAR"; // dummy
  
  attachments.push({
    filename: 'consultation.ics',
    content: Buffer.from(icsContent).toString('base64'),
    content_type: 'text/calendar'
  });

  const response = await resend.emails.send({
    from: 'Test <info@kktechsolutions.in>',
    to: 'umang@kktechsolutions.in',
    subject: 'Test Email Attachment',
    html: '<p>This is a test</p>',
    attachments
  });
  
  console.log(response);
}

testEmail();
