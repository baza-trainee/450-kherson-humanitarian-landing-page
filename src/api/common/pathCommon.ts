import type { AxiosRequestConfig } from 'axios';

import { createRequest } from '~api/common/base/createRequest';

import { requestWrapper } from './base/requestWrapper';

export const patchCommon = <R, B>(endpoint: string, body: B, params?: Record<string, string>) =>
	requestWrapper((requestConfig: AxiosRequestConfig) =>
		createRequest.patch<R>(endpoint, body, {
			params,
			...requestConfig,
		}),
	);
