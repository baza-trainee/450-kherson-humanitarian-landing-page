import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

import { requestWrapper } from '~api/helpers/requestWrapper';
import type { ApiResponse } from '~api/types/backend/responses/ApiResponse';

export const commonPost = <R, B>(
	endpoint: string,
	body: B,
	requestConfig?: AxiosRequestConfig,
): Promise<ApiResponse<R>> =>
	requestWrapper((apiUrl: string) => axios.post<R>(`${apiUrl}/${endpoint}`, body, requestConfig));
