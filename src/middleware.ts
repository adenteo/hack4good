import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  if (req.nextUrl.pathname === '/onboarding' && token?.isOnboarded) {
    return NextResponse.redirect(new URL('/home', req.nextUrl));
  }
  if (req.nextUrl.pathname === '/sign-in' && token) {
    return NextResponse.redirect(new URL('/home', req.nextUrl));
  }
  if (req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/home', req.nextUrl));
  }
  if (req.nextUrl.pathname === '/profile') {
    if (!token) {
      return NextResponse.redirect(new URL('/sign-in', req.nextUrl));
    }
    if (!token.isOnboarded) {
      return NextResponse.redirect(new URL('/onboarding', req.nextUrl));
    }
  }

  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!token) return NextResponse.redirect(new URL('/sign-in', req.nextUrl));
    const isAdmin = token.isAdmin;
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/', req.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
