import axios from 'axios';
import Cookies from 'js-cookie';

import { returnAxiosError } from '~api/helpers/returnAxiosError';

import { BASE_AUTH_URL } from './BASE_AUTH_URL';

export const getAuthCommon = async <R>(endpoint: string) => {
	const token = Cookies.get('token');
	try {
		const { data, status } = await axios.get<R>(`${BASE_AUTH_URL}${endpoint}`, {
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
