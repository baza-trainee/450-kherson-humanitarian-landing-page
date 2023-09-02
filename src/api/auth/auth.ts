import type { ApiResponse } from '~api/types/Responses/ApiResponse';

import { postAuthCommon } from './common/postAuthCommon';

interface AuthAdmin {
	username: string;
	password: string;
}

interface AuthAdminResponse {
	token: string;
}

export const authAdmin = async (body: AuthAdmin): Promise<ApiResponse<AuthAdminResponse>> =>
	postAuthCommon('auth/login', body);
