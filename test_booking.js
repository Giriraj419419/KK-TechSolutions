import http from 'http';
import handler from './api/bookings.js';

const req = {
  method: 'POST',
  body: {
    name: 'Test User',
    email: 'test@example.com',
    service: 'Microsoft 365',
    projectDetails: 'This is a test from the backend monitor.',
    date: '2026-07-20',
    time: '14:00'
  }
};

const res = {
  status: function(code) {
    this.statusCode = code;
    return this;
  },
  json: function(data) {
    console.log('Status:', this.statusCode);
    console.log('Response:', JSON.stringify(data, null, 2));
  }
};

async function test() {
  console.log('Testing booking endpoint...');
  await handler(req, res);
}

test();
