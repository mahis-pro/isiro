import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

const supabaseUrl = "https://gsbsfkenulmeobzxtmzy.supabase.co";
const supabaseKey = "sb_publishable_fqa5d0tUMnbSh3gBZxW-XQ_ydvYoBzx"; // For server-side, it's generally recommended to use the Service Role Key for elevated privileges, but using the provided anon key for now.

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