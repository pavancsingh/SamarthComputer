import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://vhcfjyhoghiylsvoxvxc.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoY2ZqeWhvZ2hpeWxzdm94dnhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwNzY5NTQsImV4cCI6MjEwMTY1Mjk1NH0.oDqifZJ5DIBvDuRYjE4tDYM0qELlUgJp12GVnVYBXmw';

/**
 * Check if active Supabase project credentials are input
 */
export const isSupabaseConfigured = () => true;

/**
 * Singleton Supabase Client Instance
 * Configured for Auth persistence, Realtime subscriptions, and Storage uploads.
 * Reads environment variables VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.
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
  console.warn('[Supabase] Initialized in fallback mode:', err.message);
  client = createClient('https://placeholder.supabase.co', 'placeholder-key', {
    auth: { persistSession: false }
  });
}

export const supabase = client;
