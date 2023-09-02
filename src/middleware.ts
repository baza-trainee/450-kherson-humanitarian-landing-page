import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { ROUTES } from '~constants/ROUTES';

export function middleware(request: NextRequest) {
	const token = request.cookies.get('token');

	const requestHeaders = new Headers(request.headers);
	requestHeaders.set('Authorization', `Bearer ${token}`);

	const pathname = request.nextUrl.pathname;

	if (!token && pathname.startsWith(ROUTES.admin)) {
		return NextResponse.redirect(new URL(ROUTES.login, request.url));
	}

	if (token && pathname.startsWith(ROUTES.login)) {
		return NextResponse.redirect(new URL(ROUTES.admin, request.url));
	}

	if (pathname === ROUTES.admin) {
		return NextResponse.redirect(new URL(`${ROUTES.admin}/lists`, request.url));
	}
}
