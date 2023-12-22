import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

import { requestWrapper } from '~api/helpers/requestWrapper';

export const commonDelete = <R>(endpoint: string, requestConfig?: AxiosRequestConfig) =>
	requestWrapper((apiUrl: string) => axios.delete<R>(`${apiUrl}/${endpoint}`, requestConfig));
