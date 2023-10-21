import axios from 'axios';

export function returnAxiosNextError(error: unknown) {
	const errorData = {
		response: {
			status: 500,
			data: {
				message: 'Unknown Error',
			},
		},
	};

	if (axios.isAxiosError(error)) {
		errorData.response.status = error.response?.status || errorData.response.status;
		errorData.response.data.message = error.response?.data.message || errorData.response.data.message;
	}
	return errorData;
}
