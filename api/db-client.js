import { createClient } from '@supabase/supabase-js';
import { triggerRestore } from './db-wake.js';

let supabase = null;

try {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      {
        global: {
          fetch: async (url, options) => {
            const res = await fetch(url, options);
            if (!res.ok && res.status >= 500) triggerRestore();
            return res;
          },
        },
      }
    );
  } else {
    console.warn("[Supabase] Credentials missing. Client not initialized.");
  }
} catch (error) {
  console.error("[Supabase] Initialization failed:", error);
}

export default supabase;
