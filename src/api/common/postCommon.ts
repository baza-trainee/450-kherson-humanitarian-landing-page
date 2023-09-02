import { createRequest } from '~api/common/base/createRequest';
import { returnAxiosError } from '~api/helpers/returnAxiosError';

export const postCommon = async <R, B>(endpoint: string, body: B) => {
	try {
		const { data, status } = await createRequest.post<R>(endpoint, body);
		return { data, status };
	} catch (error) {
		return returnAxiosError(error);
	}
};
