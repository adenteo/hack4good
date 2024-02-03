import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  console.log('here');
  const token = await getToken({ req });
  if (!token) {
    return NextResponse.redirect(new URL('/sign-in', req.nextUrl));
  }

  if (req.nextUrl.pathname.startsWith('/admin/')) {
    const isAdmin = token.isAdmin;

    if (!isAdmin) {
      return NextResponse.redirect(new URL('/', req.nextUrl)); // Adjust the URL as needed
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
