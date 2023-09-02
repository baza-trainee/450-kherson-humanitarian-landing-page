import { createRequest } from '~api/common/base/createRequest';
import { returnAxiosError } from '~api/helpers/returnAxiosError';

export const getCommon = async <R>(endpoint: string) => {
	try {
		const { data, status } = await createRequest.get<R>(endpoint);
		return { data, status };
	} catch (error) {
		return returnAxiosError(error);
	}
};
