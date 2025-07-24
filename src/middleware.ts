import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { PATHNAMES } from '@/shared/constants/pathnames';

const secretKey = process.env.SESSION_SECRET;

if (!secretKey) {
  throw new Error('SESSION_SECRET is not defined.');
}

const encodedKey = new TextEncoder().encode(secretKey);

const protectedPaths = ['/dashboard', '/insight', '/message', '/report', '/schedule', '/team'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));
  if (!isProtected) {
    return NextResponse.next();
  }

  const session = request.cookies.get('session')?.value;

  if (!session) {
    return NextResponse.redirect(new URL(PATHNAMES.LOGIN, request.url));
  }

  try {
    await jwtVerify(session, encodedKey, { algorithms: ['HS256'] });
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL(PATHNAMES.LOGIN, request.url));
  }
}

export const config = {
  matcher: ['/dashboard', '/insight', '/message', '/report', '/schedule', '/team'],
};
