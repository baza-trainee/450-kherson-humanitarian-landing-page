import type { ApiAxiosResponse } from '~api/types/backend/responses/ApiAxiosResponse';

import { getAuthCommon } from '../common/getAuthCommon';
import { postAuthCommon } from '../common/postAuthCommon';

interface AuthAdmin {
	username: string;
	password: string;
}

interface AuthAdminResponse {
	token: string;
}

export const login = async (body: AuthAdmin): Promise<ApiAxiosResponse<AuthAdminResponse>> =>
	postAuthCommon('/api/auth/login', body);

// TODO: replace get to correct delete or patch
export const logout = async (): Promise<ApiAxiosResponse<AuthAdminResponse>> =>
	getAuthCommon('/api/auth/logout');
