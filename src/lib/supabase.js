import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

/**
 * Check if active Supabase project credentials are input (non-placeholder)
 */
export const isSupabaseConfigured = () => {
  return Boolean(
    import.meta.env.VITE_SUPABASE_URL &&
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );
};

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
