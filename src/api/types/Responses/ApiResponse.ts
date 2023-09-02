import type { ResponseError } from './ResponseError';
import type { ResponseSuccess } from './ResponseSuccess';

export type ApiResponse<T> = ResponseSuccess<T> | ResponseError;
