import { create } from 'zustand';

import { api } from '~api/index';
import type { ErrorResponse } from '~api/types/backend/responses/ErrorResponse';
import type { CategoryList } from '~api/types/lists/CategoryList';
import { returnAppError } from '~helpers/returnAppError';

interface UseBoardsState {
	isLoading: boolean;
	error: ErrorResponse | null;
	listsBoardData: CategoryList[] | null;
	getBoardDataById: (name: string, id: string) => Promise<void>;
}

export const useBoardsState = create<UseBoardsState>((set) => ({
	isLoading: false,
	error: null,
	listsBoardData: null,
	getBoardDataById: async (name, id) => {
		set({ isLoading: true });

		try {
			let resp;

			//* add block data fetch here ↓↓↓
			if (name === 'lists') {
				resp = await api.lists.getListsByCategory(id);
				if ('data' in resp) set({ listsBoardData: resp.data });
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
}));
