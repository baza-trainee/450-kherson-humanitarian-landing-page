import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { ROUTES } from '~constants/ROUTES';

export function middleware(request: NextRequest) {
	const isAuth = true; // TODO: replace by const isAuth = request.cookies.get('isAuth');
	const pathname = request.nextUrl.pathname;

	if (!isAuth && pathname.startsWith(ROUTES.admin)) {
		return NextResponse.redirect(new URL(ROUTES.login, request.url));
	}

	if (isAuth && pathname.startsWith(ROUTES.login)) {
		return NextResponse.redirect(new URL(ROUTES.admin, request.url));
	}

	if (pathname === ROUTES.admin) {
		return NextResponse.redirect(new URL(`${ROUTES.admin}/hero`, request.url));
	}
}
