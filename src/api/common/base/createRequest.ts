import axios from 'axios';

import { BASE_URL } from './BASE_URL';

export const createRequest = axios.create({
	baseURL: BASE_URL,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		TEST: 'TEST',
	},
});
