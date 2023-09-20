import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

import { requestWrapper } from '~api/helpers/requestWrapper';
import type { ApiResponse } from '~api/types/backend/responses/ApiResponse';

export const clientPut = <R, B>(
	endpoint: string,
	body: B,
	requestConfig?: AxiosRequestConfig,
): Promise<ApiResponse<R>> =>
	requestWrapper((apiUrl: string) => axios.put<R>(`${apiUrl}/${endpoint}`, body, requestConfig));
