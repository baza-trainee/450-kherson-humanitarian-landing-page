import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { ROUTES } from '~constants/ROUTES';

export function middleware(request: NextRequest) {
	const token = request.cookies.get('token');

	const pathname = request.nextUrl.pathname;
	if (!token && pathname.startsWith(ROUTES.admin)) {
		return NextResponse.redirect(new URL(ROUTES.login, request.url));
	}

	if (token && pathname.startsWith(ROUTES.login)) {
		return NextResponse.redirect(new URL(ROUTES.home, request.url));
	}
}

export const config = {
	matcher: ['/login/:path*', '/admin/:path*'],
};
