import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

import { requestWrapper } from '~api/helpers/requestWrapper';
import type { ApiResponse } from '~api/types/backend/responses/ApiResponse';

export const commonDelete = <R>(
	endpoint: string,
	requestConfig?: AxiosRequestConfig,
): Promise<ApiResponse<R>> =>
	requestWrapper((apiUrl: string) => axios.delete<R>(`${apiUrl}/${endpoint}`, requestConfig));
