import type { ErrorResponse } from './ErrorResponse';
import type { SuccessResponse } from './SuccessResponse';

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
