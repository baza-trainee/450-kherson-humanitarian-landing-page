import axios from 'axios';

import { returnAppError } from '~helpers/returnAppError';

export const deleteAuthCommon = async <R>(endpoint: string) => {
	try {
		const { data, status } = await axios.delete<R>(endpoint);
		return { data, status };
	} catch (error) {
		return returnAppError(error);
	}
};
