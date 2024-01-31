import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  console.log('here');
  const token = await getToken({ req });
  if (!token) {
    console.log('REDIRECTING');
    return NextResponse.redirect(new URL('/sign-in', req.nextUrl));
  }
}

export const config = {
  matcher: ['/activities/:path*'],
};
