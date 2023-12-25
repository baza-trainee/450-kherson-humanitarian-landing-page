import { create } from 'zustand';

import { api } from '~api/index';
import type { GetHelpRequests } from '~api/types/backend/requests/GetHelpRequests';
import type { ErrorResponse } from '~api/types/backend/responses/ErrorResponse';
import type { GetHelpInfo } from '~api/types/getHelp/GetHelpInfo';
import { returnAppError } from '~helpers/returnAppError';

interface UseGetHelpState {
	isModalOnSuccessSaveOpen: boolean;
	isLoading: boolean;
	error: ErrorResponse | null;
	getHelpData: GetHelpInfo | null;
	getBoardData: () => Promise<void>;
	setIsModalOnSuccessSaveClose: () => void;
	updateGetHelp: (body: GetHelpRequests) => Promise<void>;
}

export const useGetHelpState = create<UseGetHelpState>((set) => ({
	isModalOnSuccessSaveOpen: false,
	isLoading: false,
	error: null,
	getHelpData: null,
	setIsModalOnSuccessSaveClose: () => {
		set({ isModalOnSuccessSaveOpen: false });
	},

	getBoardData: async () => {
		set({ isLoading: true });
		set({ error: null });

		try {
			const resp = await api.getHelpAdmin.getGetHelp();
			if ('data' in resp) {
				set({ getHelpData: resp.data });
			}
			if (resp && 'error' in resp) {
				set({ error: resp.error });
			}
		} catch (error) {
			set({ error: returnAppError(error) });
		} finally {
			set({ isLoading: false });
		}
	},

	updateGetHelp: async (body) => {
		set({ isLoading: true });
		set({ error: null });
		try {
			const resp = await api.getHelpAdmin.putGetHelp(body);
			if ('data' in resp) {
				set({ isModalOnSuccessSaveOpen: true });
			} else set({ error: resp.error });
		} catch (error) {
			set({ error: returnAppError(error) });
		} finally {
			set({ isLoading: false });
		}
	},
}));
