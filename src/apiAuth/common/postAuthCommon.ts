import axios from 'axios';

import type { ApiAxiosResponse } from '~api/types/backend/responses/ApiAxiosResponse';
import { returnAppError } from '~helpers/returnAppError';

export const postAuthCommon = async <R, B>(
	endpoint: string,
	body: B,
): Promise<ApiAxiosResponse<R>> => {
	try {
		const { data, status } = await axios.post(endpoint, body);
		return { data, status };
	} catch (error) {
		return returnAppError(error);
	}
};
