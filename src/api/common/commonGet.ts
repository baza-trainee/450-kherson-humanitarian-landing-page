import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

import { requestWrapper } from '~api/helpers/requestWrapper';

export const commonGet = <R>(endpoint: string, requestConfig?: AxiosRequestConfig) =>
	requestWrapper((apiUrl: string) => axios.get<R>(`${apiUrl}/${endpoint}`, requestConfig));
