import type { AxiosRequestConfig } from 'axios';

import { API_URL } from '~api/constants/API_URL';
import type { ApiResponse } from '~api/types/responses/ApiResponse';
import { isClient } from '~helpers/isClient';
import { returnAppError } from '~helpers/returnAppError';

export const requestWrapper = async <T>(
	callbackReq: (apiUrl: string, requestConfig?: AxiosRequestConfig) => Promise<ApiResponse<T>>,
): Promise<ApiResponse<T>> => {
	const apiUrl = isClient() ? API_URL.client : API_URL.server;

	try {
		const req = await callbackReq(apiUrl);

		if ('data' in req) return { data: req.data, status: req.status };
		throw new Error('No data in response');
	} catch (error) {
		return returnAppError(error);
	}
};
