import { create } from 'zustand';

import { api } from '~api/index';
import type { ErrorResponse } from '~api/types/backend/responses/ErrorResponse';
import type { OurAchievements } from '~api/types/ourAchievements/OurAchievements';
import { returnAppError } from '~helpers/returnAppError';

interface UseOurAchievementsBoardState {
	isLoading: boolean;
	error: ErrorResponse | null;
	ourAchievementsBoardData: OurAchievements | null;
	getBoardData: (name: string) => Promise<void>;
}

export const useOurAchievementsBoardState = create<UseOurAchievementsBoardState>((set) => ({
	isLoading: false,
	error: null,
	ourAchievementsBoardData: null,

	getBoardData: async () => {
		set({ isLoading: true });
		set({ error: null });

		try {
			const resp = await api.ourAchievements.getOurAchievements();
			if ('data' in resp) set({ ourAchievementsBoardData: resp.data });


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
