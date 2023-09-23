import { create } from 'zustand';

import { apiAuth } from '~/apiAuth';
import type { ErrorResponse } from '~api/types/responses/ErrorResponse';
import { returnAppError } from '~helpers/returnAppError';

interface UseLoginState {
	isLoading: boolean;
	error: ErrorResponse | null;
	isLogin: boolean;
	login: (login: string, password: string) => Promise<void>;
}

export const useLoginState = create<UseLoginState>((set) => ({
	isLoading: false,
	error: null,
	isLogin: false,
	login: async (login, password) => {
		set({ isLoading: true });
		set({ isLogin: false });
		try {
			const resp = await apiAuth.login({ username: login, password: password });
			if ('data' in resp) {
				set({ isLogin: true });
			} else {
				set({ error: resp });
			}
		} catch (error) {
			set({ error: returnAppError(error) });
		} finally {
			set({ isLoading: false });
		}
	},
}));
