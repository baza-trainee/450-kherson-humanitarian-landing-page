import axios from 'axios';
import Cookies from 'js-cookie';

import { returnAxiosError } from '~api/helpers/returnAxiosError';
import type { ApiResponse } from '~api/types/backend/Responses/ApiResponse';

import { BASE_AUTH_URL } from './BASE_AUTH_URL';

export const postAuthCommon = async <R, B>(endpoint: string, body: B): Promise<ApiResponse<R>> => {
	const token = Cookies.get('token');
	try {
		const { data, status } = await axios.post(`${BASE_AUTH_URL}${endpoint}`, body, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		return { data, status };
	} catch (error) {
		return returnAxiosError(error);
	}
};
