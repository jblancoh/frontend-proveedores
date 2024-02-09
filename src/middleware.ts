import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const LOGIN_PATH = '/login';
const HOME_PATH = '/home';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('session')?.value

  if (token && request.nextUrl.pathname.startsWith(LOGIN_PATH)) {
    return NextResponse.redirect(new URL(HOME_PATH, request.url));
  }
  if (!token && !request.nextUrl.pathname.startsWith(LOGIN_PATH)) {
    return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|$).*)'
  ]
}