import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = "https://gsbsfkenulmeobzxtmzy.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzYnNma2VudWxtZW9ienh0bXp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5OTg4NzIsImV4cCI6MjA3NjU3NDg3Mn0.qi9Zt7qaDWifpZNENOVYZu-SInqT_foI_40_ql9C6hE"

export const supabase = createBrowserClient(
  supabaseUrl,
  supabaseAnonKey
)