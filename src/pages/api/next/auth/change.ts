import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import { API_URL } from '~api/constants/API_URL';
import { returnAxiosNextError } from '~api/helpers/returnAxiosNextError';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { password } = req.body;

	const token = req.cookies.token;

	try {
		const response = await axios.post(
			`${API_URL.auth}/change`,
			{ password },
			{
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			},
		);

		res.status(response.status).json(response.data);
	} catch (error) {
		const errorData = returnAxiosNextError(error);
		return res.status(errorData.response.status).json(errorData.response.data);
	}
}
