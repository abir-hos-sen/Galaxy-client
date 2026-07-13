import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function decodeJwt(token: string): any {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = parts[1];

    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const accessToken = req.cookies.get('accessToken')?.value;
  const decoded = accessToken ? decodeJwt(accessToken) : null;

  const isAuthRequired = pathname.startsWith('/items/add') || pathname.startsWith('/items/manage') || pathname.startsWith('/profile');
  const isAdminRequired = pathname.startsWith('/admin');

  if (isAuthRequired || isAdminRequired) {
    if (!accessToken || !decoded) {
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (isAdminRequired && decoded.role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  const isAuthPage = pathname === '/login' || pathname === '/register';
  if (isAuthPage && accessToken && decoded) {
    return NextResponse.redirect(new URL('/items/manage', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/items/:path*',
    '/admin/:path*',
    '/profile',
    '/login',
    '/register',
  ],
};
