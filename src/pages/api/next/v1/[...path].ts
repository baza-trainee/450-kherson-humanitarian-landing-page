import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import { API_URL } from '~api/constants/API_URL';
import { returnAxiosNextError } from '~api/helpers/returnAxiosNextError';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const token = req.cookies.token;

	const createRequest = axios.create({
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});

	const endpoint = req.url?.replace(API_URL.client, '');
	const URL = `${API_URL.server}${endpoint}`;

	const method = req.method;

	try {
		let response;
		switch (method) {
			case 'DELETE':
				response = await createRequest.delete(URL);
				break;

			case 'PATCH':
				response = await createRequest.patch(URL, req.body);
				break;

			case 'POST':
				response = await createRequest.post(URL, req.body);
				break;

			case 'PUT':
				response = await createRequest.put(URL, req.body);
				break;

			default:
				response = await createRequest.get(URL);
				break;
		}

		res.status(response.status).json(response.data);
	} catch (error) {
		const errorData = returnAxiosNextError(error);
		return res.status(errorData.response.status).json(errorData.response.data);
	}
}
