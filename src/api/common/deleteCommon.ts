import type { AxiosRequestConfig } from 'axios';

import { createRequest } from '~api/common/base/createRequest';

import { requestWrapper } from './base/requestWrapper';

export const deleteCommon = <R>(endpoint: string, params?: Record<string, string>) =>
	requestWrapper((requestConfig: AxiosRequestConfig) =>
		createRequest.get<R>(endpoint, {
			params,
			...requestConfig,
		}),
	);
