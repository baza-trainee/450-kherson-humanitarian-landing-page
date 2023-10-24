import type { ApiResponse } from '~api/types/backend/responses/ApiResponse';

import { deleteAuthCommon } from '../common/deleteAuthCommon';
import { postAuthCommon } from '../common/postAuthCommon';

interface AuthAdminRequest {
	username: string;
	password: string;
}

interface ChangePasswordRequest {
	password: string;
}

interface AuthAdminResponse {
	token: string;
}

interface ChangePasswordResponse {
	message: string;
}

export const login = async (body: AuthAdminRequest): Promise<ApiResponse<AuthAdminResponse>> =>
	postAuthCommon('/api/next/auth/login', body);

export const change = async (
	body: ChangePasswordRequest,
): Promise<ApiResponse<ChangePasswordResponse>> => postAuthCommon('/api/next/auth/change', body);

export const logout = async (): Promise<ApiResponse<AuthAdminResponse>> =>
	deleteAuthCommon('/api/next/auth/logout');
