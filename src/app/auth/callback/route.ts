import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) {
      console.error("Supabase auth callback error:", error); // Added server-side error logging
    }
  }

  // URL to redirect to after sign in process completes.
  // SessionContextProvider will handle further redirection based on onboarding status.
  return NextResponse.redirect(requestUrl.origin)
}