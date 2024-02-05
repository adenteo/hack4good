import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // if (req.nextUrl.pathname === '/') {
  //   return NextResponse.redirect(new URL('/home', req.nextUrl)); // Adjust the URL as needed
  // }
  
  // if (req.nextUrl.pathname.startsWith('/admin')) {
  //   const token = await getToken({ req });
  // if (!token) {
  //   return NextResponse.redirect(new URL('/sign-in', req.nextUrl));
  // }
  //   const isAdmin = token.roleId === 'Admin';
  //   if (!isAdmin) {
  //     return NextResponse.redirect(new URL('/', req.nextUrl)); // Adjust the URL as needed
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
