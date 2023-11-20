import { create } from 'zustand';

import { api } from '~api/index';
import type { OurActivityRequest } from '~api/types/backend/requests/OurActivityRequest';
import type { ErrorResponse } from '~api/types/backend/responses/ErrorResponse';
import type { OurActivityBoardData } from '~api/types/ourActivity/OurActivityBoardData';
import { returnAppError } from '~helpers/returnAppError';

interface OurActivityState {
	isModalOnSuccessSaveOpen: boolean;
	isLoading: boolean;
	error: ErrorResponse | null;
	ourActivityBoardData: OurActivityBoardData | null;
	getOurActivityBoardById: (id: string) => Promise<void>;
	addNewEmptyOurActivityBoard: () => Promise<void>;
	deleteOurActivityBoardById: (id: string) => Promise<void>;
	updateOurActivityBoard: (body: OurActivityRequest) => Promise<void>;
	setIsModalOnSuccessSaveClose: () => void;
	addNewOurActivityBoard: (body: OurActivityRequest) => Promise<void>;
}

export const useOurActivityBoardsState = create<OurActivityState>((set) => ({
	isModalOnSuccessSaveOpen: false,
	isLoading: false,
	error: null,
	ourActivityBoardData: null,
	getOurActivityBoardById: async (id) => {
		set({ isLoading: true });
		set({ error: null });

		try {
			if (id !== 'new') {
				const resp = await api.ourActivity.getBoardOurActivityById(id);
				if ('data' in resp) set({ ourActivityBoardData: resp.data });
				if (resp && 'error' in resp) {
					set({ error: resp.error });
				}
			}
		} catch (error) {
			set({ error: returnAppError(error) });
		} finally {
			set({ isLoading: false });
		}
	},
	deleteOurActivityBoardById: async (id) => {
		set({ isLoading: true });
		set({ error: null });
		set({ ourActivityBoardData: null });

		try {
			const resp = await api.ourActivity.deleteOurActivityBoardById(id);
			if (resp && 'error' in resp) set({ error: resp.error });
		} catch (error) {
			set({ error: returnAppError(error) });
		} finally {
			set({ isLoading: false });
		}
	},

	updateOurActivityBoard: async (body) => {
		set({ isLoading: true });
		set({ error: null });

		try {
			const resp = await api.ourActivity.updateOurActivityBoard(body);
			if ('data' in resp) {
				set({ ourActivityBoardData: resp.data });
				set({ isModalOnSuccessSaveOpen: true });
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
	setIsModalOnSuccessSaveClose: () => {
		set({ isModalOnSuccessSaveOpen: false });
	},

	addNewEmptyOurActivityBoard: async () => {
		set({
			ourActivityBoardData: {
				imageUrl: '',
			},
		});
	},

	addNewOurActivityBoard: async (body) => {
		set({ isLoading: true });
		set({ error: null });

		try {
			const resp = await api.ourActivity.addNewOurActivityBoard(body);
			if ('data' in resp) set({ isModalOnSuccessSaveOpen: true });
		} catch (error) {
			set({ error: returnAppError(error) });
		}
	},
}));
