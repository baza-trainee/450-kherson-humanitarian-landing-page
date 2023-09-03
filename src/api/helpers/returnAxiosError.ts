import axios from 'axios';
import Cookies from 'js-cookie';
import router from 'next/router';

import type { ResponseError } from '~api/types/Responses/ResponseError';
import { ROUTES } from '~constants/ROUTES';
import { returnAppError } from '~helpers/returnAppError';

export function returnAxiosError(error: unknown): ResponseError {
	returnAppError(error);

	if (axios.isAxiosError(error)) {
		// TODO: move unauth check to another place
		if (error.response?.status === 403) {
			Cookies.remove('token');
			router.push(ROUTES.login);
		}
		return {
			status: error.response?.status || 500,
			error: error.response?.data.message || 'Something went wrong on a server ¯\\_(ツ)_/¯!',
		};
	} else {
		return {
			status: 500,
			error: 'Something went wrong on a server ¯\\_(ツ)_/¯!',
		};
	}
}
