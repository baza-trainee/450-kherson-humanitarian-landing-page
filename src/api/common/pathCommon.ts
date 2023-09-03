import { createRequest } from '~api/common/base/createRequest';
import { returnAxiosError } from '~api/helpers/returnAxiosError';

export const patchCommon = async <R, B>(endpoint: string, body: B) => {
	try {
		const { data, status } = await createRequest.patch<R>(endpoint, body);
		return { data, status };
	} catch (error) {
		console.log('error: ', error);
		return returnAxiosError(error);
	}
};
