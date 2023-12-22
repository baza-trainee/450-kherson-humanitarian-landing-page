import axios from 'axios';
import cookie from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

import { API_URL } from '~api/constants/API_URL';
import { returnAxiosNextError } from '~api/helpers/returnAxiosNextError';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { username, password } = req.body;

	try {
		const response = await axios.post(`${API_URL.auth}/login`, { username, password });
		if ('data' in response) {
			const serializedCookie = cookie.serialize('token', response?.data?.token, {
				httpOnly: true,
				secure: process.env.NODE_ENV !== 'development',
				maxAge: 60 * 60 * 24,
				sameSite: 'strict',
				path: '/',
			});
			res.setHeader('Set-Cookie', serializedCookie);
			res.status(response.status).json(response.data);
		}
	} catch (error) {
		const errorData = returnAxiosNextError(error);
		return res.status(errorData.response.status).json(errorData.response.data);
	}
}
