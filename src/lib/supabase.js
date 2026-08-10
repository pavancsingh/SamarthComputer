import { createClient } from '@supabase/supabase-js';

const defaultUrl = 'https://vhcfjyhoghiylsvoxvxc.supabase.co';
const defaultKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoY2ZqeWhvZ2hpeWxzdm94dnhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwNzY5NTQsImV4cCI6MjEwMTY1Mjk1NH0.oDqifZJ5DIBvDuRYjE4tDYM0qELlUgJp12GVnVYBXmw';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || defaultUrl;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || defaultKey;

/**
 * Check if active Supabase project credentials are configured
 */
export const isSupabaseConfigured = () => {
  return Boolean(supabaseUrl && supabaseAnonKey);
};

/**
 * Singleton Supabase Client Instance
 * Configured with resilient fallback to prevent top-level module load crashes in production.
 */
let client;
try {
  client = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false
    },
  });
} catch (err) {
  console.error('[Supabase Client Error] Failed to initialize Supabase client:', err.message);
  client = createClient(defaultUrl, defaultKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false
    },
  });
}

export const supabase = client;
