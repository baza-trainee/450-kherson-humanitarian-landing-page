import { create } from 'zustand';

import { api } from '~api/index';
import type { ErrorResponse } from '~api/types/backend/responses/ErrorResponse';
import type { CategoryList } from '~api/types/lists/CategoryList';
import { returnAppError } from '~helpers/returnAppError';

interface UseListsState {
	isLoading: boolean;
	error: ErrorResponse | null;
	listsBoardData: CategoryList[] | null;
	getBoardDataById: (id: string) => Promise<void>;
}

export const useListsState = create<UseListsState>((set) => ({
	isLoading: false,
	error: null,
	listsBoardData: null,
	getBoardDataById: async (id) => {
		set({ isLoading: true });
		set({ error: null });

		try {
			const resp = await api.lists.getListsByCategory(id);
			if ('data' in resp) set({ listsBoardData: resp.data });

			if (resp && 'error' in resp) set({ error: resp.error });
		} catch (error) {
			set({ error: returnAppError(error) });
		} finally {
			set({ isLoading: false });
		}
	},
}));
