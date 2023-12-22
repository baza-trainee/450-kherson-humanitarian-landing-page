import axios from 'axios';
import router from 'next/router';

import { apiAuth } from '~/apiAuth';
import { APP } from '~constants/APP';
import { ROUTES } from '~constants/ROUTES';

import { isClient } from './isClient';
import type { ReturnError } from './returnError';
import { returnError } from './returnError';

export function returnAppError(error: unknown, status?: number): ReturnError {
	if (axios.isAxiosError(error)) {
		if (isClient() && error.response?.status === 403) {
			apiAuth.logout();
			router.push(ROUTES.login);
		}

		const message = error.response?.data.message;
		status = error.response?.status;
		return returnError(message, status, APP.name, 1);
	}
	return returnError(error, status, APP.name, 1);
}
