import { createRequest } from '~api/common/base/createRequest';
import { returnAxiosError } from '~api/helpers/returnAxiosError';

export const deleteCommon = async <R>(endpoint: string) => {
	try {
		const { data, status } = await createRequest.delete<R>(endpoint);
		return { data, status };
	} catch (error) {
		return returnAxiosError(error);
	}
};
