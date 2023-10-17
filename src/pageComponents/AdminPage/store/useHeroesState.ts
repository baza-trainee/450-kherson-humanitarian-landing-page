import { create } from 'zustand';

import { api } from '~api/index';
import type { ErrorResponse } from '~api/types/backend/responses/ErrorResponse';
import type { HeroResponse } from '~api/types/backend/responses/HeroResponse';
import { returnAppError } from '~helpers/returnAppError';

interface UseHeroesState {
	isLoading: boolean;
	error: ErrorResponse | null;
	heroBoardData: HeroResponse | null;
	getHeroBoardById: (id: string) => Promise<void>;
}

export const useHeroesState = create<UseHeroesState>((set) => ({
	isLoading: false,
	error: null,
	heroBoardData: null,
	getHeroBoardById: async (id) => {
		set({ isLoading: true });
		set({ error: null });
		try {
			const resp = await api.hero.getHeroBoardById(id);
			if ('data' in resp) {
				set({ heroBoardData: resp.data });
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
