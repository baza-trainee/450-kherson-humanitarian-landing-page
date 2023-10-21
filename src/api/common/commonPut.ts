import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

import { requestWrapper } from '~api/helpers/requestWrapper';

export const clientPut = <R, B>(endpoint: string, body: B, requestConfig?: AxiosRequestConfig) =>
	requestWrapper((apiUrl: string) => axios.put<R>(`${apiUrl}/${endpoint}`, body, requestConfig));
