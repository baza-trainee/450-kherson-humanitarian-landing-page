import { createRequest } from '~api/common/base/createRequest';
import { returnAxiosError } from '~api/helpers/returnAxiosError';

export const putCommon = async <R, B>(endpoint: string, body: B) => {
	try {
		const { data, status } = await createRequest.put<R>(endpoint, body);
		return { data, status };
	} catch (error) {
		return returnAxiosError(error);
	}
};
