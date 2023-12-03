import { create } from 'zustand';

import { api } from '~api/index';
import type { OurAchievementsRequest } from '~api/types/backend/requests/OurAchievementsRequest';
import type { ErrorResponse } from '~api/types/backend/responses/ErrorResponse';
import type { OurAchievements } from '~api/types/ourAchievements/OurAchievements';
import { returnAppError } from '~helpers/returnAppError';

interface UseOurAchievementsBoardState {
	isModalOnSuccessSaveOpen: boolean;
	isLoading: boolean;
	error: ErrorResponse | null;
	ourAchievementsBoardData: OurAchievements | null;

	getBoardData: () => Promise<void>;
	setIsModalOnSuccessSaveClose: () => void;
	updateOurAchievementsDataBoard: (body: OurAchievementsRequest)=>Promise<void>;
}

export const useOurAchievementsBoardState = create<UseOurAchievementsBoardState>((set) => ({
	isModalOnSuccessSaveOpen: false,
	isLoading: false,
	error: null,
	ourAchievementsBoardData: null,

	setIsModalOnSuccessSaveClose: () => {
		set({ isModalOnSuccessSaveOpen: false });
	},

	getBoardData: async () => {
		set({ isLoading: true });
		set({ error: null });

		try {
			const resp = await api.ourAchievements.getOurAchievements();
			if ('data' in resp) {
				set({ ourAchievementsBoardData: resp.data });

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
	updateOurAchievementsDataBoard: async (body) => {
		set({ isLoading: true });
		set({ error: null });
		try {
			const resp = await api.ourAchievements.putOurAchievements(body);
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


