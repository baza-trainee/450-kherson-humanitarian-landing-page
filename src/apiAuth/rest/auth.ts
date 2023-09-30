import type { ApiResponse } from '~api/types/backend/responses/ApiResponse';

import { getAuthCommon } from '../common/getAuthCommon';
import { postAuthCommon } from '../common/postAuthCommon';

interface AuthAdmin {
	username: string;
	password: string;
}

interface AuthAdminResponse {
	token: string;
}

export const login = async (body: AuthAdmin): Promise<ApiResponse<AuthAdminResponse>> =>
	postAuthCommon('/api/auth/login', body);

// TODO: replace get to correct delete or patch
export const logout = async (): Promise<ApiResponse<AuthAdminResponse>> =>
	getAuthCommon('/api/auth/logout');
