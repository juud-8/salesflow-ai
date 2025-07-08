import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  await supabase.auth.getSession();

  const { pathname } = req.nextUrl;
  const isAuthRoute = pathname.startsWith('/auth');
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session && !isAuthRoute && pathname.startsWith('/settings')) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }
  return res;
}

export const config = {
  matcher: ['/settings/:path*'],
};
