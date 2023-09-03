import axios from 'axios';
import Cookies from 'js-cookie';

import { BASE_URL } from './BASE_URL';

const token = Cookies.get('token');

export const createRequest = axios.create({
	baseURL: BASE_URL,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`,
	},
});
