import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const isAuthenticated = false;

export function middleware(request: NextRequest) {
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: []
};