import { create } from 'zustand';

import { api } from '~api/index';
import type { CategoryList } from '~api/types/Admin/Lists/CategoryList';
import type { ErrorResponse } from '~api/types/responses/ErrorResponse';
import { returnAppError } from '~helpers/returnAppError';

interface UseListsState {
	isLoading: boolean;
	error: ErrorResponse | null;
	lists: CategoryList[] | null;
	getListsByCategory: (category: string) => Promise<void>;
}

export const useListsState = create<UseListsState>((set) => ({
	isLoading: false,
	error: null,
	lists: null,
	getListsByCategory: async (category) => {
		set({ isLoading: true });

		const resp = await api.lists.getListsByCategory(category);
		try {
			if ('data' in resp) {
				set({ lists: resp.data });
			} else {
				set({ error: resp.error });
			}
		} catch (error) {
			set({ error: returnAppError(error) });
		} finally {
			set({ isLoading: false });
		}
	},
}));
