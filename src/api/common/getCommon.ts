import type { AxiosRequestConfig } from 'axios';

import { createRequest } from '~api/common/base/createRequest';
import type { ApiResponse } from '~api/types/backend/Responses/ApiResponse';

import { requestWrapper } from './base/requestWrapper';

export const getCommon = <R>(endpoint: string, params?: Record<string, string>): Promise<ApiResponse<R>> =>
	requestWrapper((requestConfig: AxiosRequestConfig) =>
		createRequest.get<R>(endpoint, {
			params,
			...requestConfig,
		}),
	);
