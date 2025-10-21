import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = "https://gsbsfkenulmeobzxtmzy.supabase.co"
const supabaseAnonKey = "sb_publishable_fqa5d0tUMnbSh3gBZxW-XQ_ydvYoBzx"

export const supabase = createBrowserClient(
  supabaseUrl,
  supabaseAnonKey
)