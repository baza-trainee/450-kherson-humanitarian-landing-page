import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

import { requestWrapper } from '~api/helpers/requestWrapper';

export const commonPatch = <R, B>(endpoint: string, body: B, requestConfig?: AxiosRequestConfig) =>
	requestWrapper((apiUrl: string) => axios.patch<R>(`${apiUrl}/${endpoint}`, body, requestConfig));
