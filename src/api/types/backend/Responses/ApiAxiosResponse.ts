import type { ErrorResponse } from './ErrorResponse';
import type { SuccessResponse } from './SuccessResponse';

export type ApiAxiosResponse<T> = SuccessResponse<T> | ErrorResponse;
