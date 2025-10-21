import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

const supabaseUrl = "https://gsbsfkenulmeobzxtmzy.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzYnNma2VudWxtZW9ienh0bXp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5OTg4NzIsImV4cCI6MjA3NjU3NDg3Mn0.qi9Zt7qaDWifpZNENOVYZu-SInqT_foI_40_ql9C6hE"; // This should ideally be the service role key for server-side, but using anon key as per previous context.

export const createClient = () => {
  // Explicitly cast cookies() to 'any' to bypass TypeScript's incorrect Promise inference
  const cookieStore: any = cookies();

  return createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set(name, value, options);
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set(name, '', options);
          } catch (error) {
            // The `remove` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
};