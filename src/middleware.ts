import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Refresh the session, and update the cookies if necessary
  await supabase.auth.getSession();

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - auth (authentication pages)
     * - onboarding (onboarding pages)
     * - public-info (hypothetical public page)
     * - any file with an extension (e.g., .svg, .png, .jpg, .jpeg, .gif, .webp)
     */
    '/((?!_next/static|_next/image|favicon.ico|auth|onboarding|public-info|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};