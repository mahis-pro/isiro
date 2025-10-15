import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Log the values to the console to verify they are being picked up correctly
console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Anon Key (first 5 chars):", supabaseAnonKey ? supabaseAnonKey.substring(0, 5) + '...' : 'Not set');

export const supabase = createBrowserClient(
  supabaseUrl,
  supabaseAnonKey
)