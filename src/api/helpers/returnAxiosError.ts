import axios from 'axios';
import Cookies from 'js-cookie';
import router from 'next/router';

import type { ErrorResponse } from '~api/types/backend/Responses/ErrorResponse';
import { ROUTES } from '~constants/ROUTES';
import { returnAppError } from '~helpers/returnAppError';

export function returnAxiosError(error: unknown): ErrorResponse {
	returnAppError(error);

	const errorData = {
		status: -1,
		error: 'Unknown Error',
	};

	if (axios.isAxiosError(error)) {
		if (typeof window !== 'undefined' && error.response?.status === 403) {
			Cookies.remove('token');
			router.push(ROUTES.login);
		}

		errorData.status = error.response?.status || errorData.status;
		errorData.error = error.response?.data.message || errorData.error;
		returnAppError(`${errorData.status} | ${errorData.error}`);
	}
	return errorData;
}
