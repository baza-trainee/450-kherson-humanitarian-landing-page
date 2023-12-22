import axios from 'axios';

import { returnAppError } from '~helpers/returnAppError';

export const getAuthCommon = async <R>(endpoint: string) => {
	try {
		const { data, status } = await axios.get<R>(endpoint);
		return { data, status };
	} catch (error) {
		return returnAppError(error);
	}
};
