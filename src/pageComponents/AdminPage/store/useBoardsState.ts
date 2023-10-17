import { create } from 'zustand';

import { api } from '~api/index';
import type { ErrorResponse } from '~api/types/backend/responses/ErrorResponse';
import type { CategoryList } from '~api/types/lists/CategoryList';
import type { OurActivityBoardData } from '~api/types/ourActivity/OurActivityBoardData';
import { returnAppError } from '~helpers/returnAppError';

interface UseBoardsState {
	isLoading: boolean;
	error: ErrorResponse | null;
	listsBoardData: CategoryList[] | null;
	ourActivityBoardData: OurActivityBoardData | null;
	getBoardDataById: (name: string, id: string) => Promise<void>;
}

export const useBoardsState = create<UseBoardsState>((set) => ({
	isLoading: false,
	error: null,
	listsBoardData: null,
	ourActivityBoardData: null,
	getBoardDataById: async (name, id) => {
		set({ isLoading: true });
		set({ error: null });

		try {
			let resp;

			//* add block data fetch here ↓
			if (name === 'lists' && id) {
				resp = await api.lists.getListsByCategory(id);
				if ('data' in resp) set({ listsBoardData: resp.data });
			} else if (name === 'our-activity') {
				resp = await api.ourActivity.getBoardById(id);
				if ('data' in resp) set({ ourActivityBoardData: resp.data });
			}

			if (resp && 'error' in resp) set({ error: resp.error });
		} catch (error) {
			set({ error: returnAppError(error) });
		} finally {
			set({ isLoading: false });
		}
	},
}));
