import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import handler from '../api/leads.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env
const envPath = resolve(__dirname, '../.env');
const envContent = readFileSync(envPath, 'utf-8');
for (const line of envContent.split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const eqIdx = trimmed.indexOf('=');
  if (eqIdx === -1) continue;
  const key = trimmed.substring(0, eqIdx).trim();
  process.env[key] = trimmed.substring(eqIdx + 1).trim().replace(/^"(.*)"$/, '$1');
}

console.log('--- STARTING END-TO-END TEST ---');

// Mock request
const req = {
  method: 'POST',
  body: {
    name: 'End-to-End Test User',
    company: 'Test E2E Corp',
    email: 'test@example.com',
    phone: '9999999999',
    service: 'AWS Cloud',
    budget: '10L+',
    projectDetails: 'This is an end-to-end test of the entire API handler locally.'
  }
};

// Mock response
const res = {
  status: function(code) {
    this.statusCode = code;
    return this;
  },
  json: function(data) {
    this.body = data;
    console.log('\n--- API RESPONSE ---');
    console.log(`Status: ${this.statusCode}`);
    console.log('Body:', JSON.stringify(data, null, 2));
    if (this.statusCode !== 200) {
      console.error('E2E TEST FAILED');
      process.exit(1);
    } else {
      console.log('E2E TEST PASSED');
    }
  }
};

// Execute handler
(async () => {
  try {
    await handler(req, res);
  } catch (err) {
    console.error('Handler threw error:', err);
  }
})();
