import type { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

import { returnAxiosError } from '~api/helpers/returnAxiosError';
import type { ApiResponse } from '~api/types/backend/Responses/ApiResponse';

export const requestWrapper = async <T>(
	callbackReq: (requestConfig: AxiosRequestConfig) => Promise<ApiResponse<T>>,
): Promise<ApiResponse<T>> => {
	const token = Cookies.get('token') || '';

	try {
		const req = await callbackReq({
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if ('data' in req) return { data: req.data, status: req.status };
		throw new Error('No data in response');
	} catch (error) {
		return returnAxiosError(error);
	}
};
