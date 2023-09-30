import axios from 'axios';

import type { ApiResponse } from '~api/types/backend/responses/ApiResponse';
import { returnAppError } from '~helpers/returnAppError';

export const postAuthCommon = async <R, B>(endpoint: string, body: B): Promise<ApiResponse<R>> => {
	try {
		const { data, status } = await axios.post(endpoint, body);
		return { data, status };
	} catch (error) {
		return returnAppError(error);
	}
};
