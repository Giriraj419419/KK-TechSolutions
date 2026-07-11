// Test Resend API
import { Resend } from 'resend';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Read .env manually
const envPath = resolve(__dirname, '../.env');
const envContent = readFileSync(envPath, 'utf-8');
const env = {};
for (const line of envContent.split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const eqIdx = trimmed.indexOf('=');
  if (eqIdx === -1) continue;
  const key = trimmed.substring(0, eqIdx).trim();
  let val = trimmed.substring(eqIdx + 1).trim().replace(/^"(.*)"$/, '$1');
  env[key] = val;
}

console.log('Loaded ENV keys:', Object.keys(env));
console.log('FROM_EMAIL:', env.FROM_EMAIL);
console.log('INTERNAL_SALES_EMAIL:', env.INTERNAL_SALES_EMAIL);
console.log('RESEND_API_KEY starts with:', env.RESEND_API_KEY?.substring(0, 10) + '...');

const resend = new Resend(env.RESEND_API_KEY);

console.log('\n--- Testing Internal Notification Email ---');
try {
  const result = await resend.emails.send({
    from: `KK Tech Solutions <${env.FROM_EMAIL}>`,
    to: env.INTERNAL_SALES_EMAIL,
    subject: '🔧 Audit Test - Internal Notification',
    html: '<h2>Audit Test</h2><p>This is an internal notification email test from the audit script. If received, the Resend API is working correctly for your domain.</p>'
  });
  console.log('Internal Email Result:', JSON.stringify(result, null, 2));
} catch (err) {
  console.error('Internal Email ERROR:', err.message);
  if (err.response) console.error('Error Details:', JSON.stringify(err.response, null, 2));
}

console.log('\n--- Testing Customer Confirmation Email ---');
try {
  const result = await resend.emails.send({
    from: `KK Tech Solutions <${env.FROM_EMAIL}>`,
    to: env.INTERNAL_SALES_EMAIL, // Sending to internal to verify without spamming random emails
    subject: '✅ Audit Test - Customer Confirmation',
    html: '<h2>Customer Confirmation Test</h2><p>This is a customer confirmation email test from the audit script.</p>'
  });
  console.log('Customer Email Result:', JSON.stringify(result, null, 2));
} catch (err) {
  console.error('Customer Email ERROR:', err.message);
  if (err.response) console.error('Error Details:', JSON.stringify(err.response, null, 2));
}
