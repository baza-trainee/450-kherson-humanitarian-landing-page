import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

import { requestWrapper } from '~api/helpers/requestWrapper';

export const commonPost = <R, B>(endpoint: string, body: B, requestConfig?: AxiosRequestConfig) =>
	requestWrapper((apiUrl: string) => axios.post<R>(`${apiUrl}/${endpoint}`, body, requestConfig));
