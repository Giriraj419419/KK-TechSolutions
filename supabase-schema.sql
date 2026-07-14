-- Run this script in your Supabase SQL Editor to create the bookings table
-- and set up the necessary unique constraints.

CREATE TABLE public.bookings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  service text NOT NULL,
  budget text,
  project_details text,
  date text NOT NULL, -- e.g., '2026-07-18'
  time text NOT NULL, -- e.g., '11:00 AM'
  status text DEFAULT 'Confirmed'::text NOT NULL,
  
  -- The unique constraint ensures that no two people can book the exact same date and time.
  -- This inherently protects against race conditions at the database level.
  CONSTRAINT unique_date_time UNIQUE (date, time)
);

-- Optional: Enable Row Level Security (if your project uses it heavily)
-- For this simple server-side implementation using SERVICE_ROLE_KEY, 
-- it's not strictly necessary, but good practice.
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Allow reading all bookings (so frontend can check availability without auth if you wanted to query directly)
-- However, we are querying via the /api/bookings route using the Service Role Key, 
-- so RLS policies are bypassed for the API.
