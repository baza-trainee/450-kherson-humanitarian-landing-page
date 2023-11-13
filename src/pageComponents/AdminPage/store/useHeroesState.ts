import { create } from 'zustand';

import { api } from '~api/index';
import { transformHeroBoardDTO } from '~api/rest/hero/dto/transformHeroBoardDTO';
import type { HeroRequest } from '~api/types/backend/requests/HeroRequest';
import type { ErrorResponse } from '~api/types/backend/responses/ErrorResponse';
import type { Hero } from '~api/types/hero/Hero';
import { returnAppError } from '~helpers/returnAppError';

interface UseHeroesState {
	isSuccess: boolean;
	isLoading: boolean;
	error: ErrorResponse | null;
	heroBoardData: Hero | null;
	getHeroBoardById: (id: string) => Promise<void>;
	addNewEmptyHeroBoard: () => Promise<void>;
	changeHeroBoard: (body: HeroRequest) => Promise<void>;
	addNewHeroBoard: (body: HeroRequest) => Promise<void>;
	deleteHeroBoard: (id: string) => Promise<void>;
	setIsSuccess: () => void;
}

export const useHeroesState = create<UseHeroesState>((set) => ({
	isSuccess: false,
	isLoading: false,
	error: null,
	heroBoardData: null,
	getHeroBoardById: async (id) => {
		set({ isLoading: true });
		set({ error: null });
		try {
			if (id !== 'new') {
				const resp = await api.hero.getHeroBoardById(id);
				if ('data' in resp) {
					set({ heroBoardData: resp.data });
				} else {
					set({ error: resp.error });
				}
			}
		} catch (error) {
			set({ error: returnAppError(error) });
		} finally {
			set({ isLoading: false });
		}
	},
	setIsSuccess: () => {
		set({ isSuccess: false });
	},
	addNewEmptyHeroBoard: async () => {
		set({
			heroBoardData: {
				image: '',
				imageGradient: '',
				title: '',
				titleColor: '',
				subtitle: '',
				subtitleColor: '',
			},
		});
		set({ isLoading: false });
	},
	changeHeroBoard: async (body: HeroRequest) => {
		set({ isLoading: true });
		set({ error: null });
		try {
			const resp = await api.hero.changeHeroBoard(body);
			if ('data' in resp) {
				if (resp.data) {
					set({ heroBoardData: transformHeroBoardDTO(resp.data) });
					set({ isSuccess: true });
				}
			} else {
				set({ error: resp.error });
			}
		} catch (error) {
			set({ error: returnAppError(error) });
		} finally {
			set({ isLoading: false });
		}
	},
	addNewHeroBoard: async (body: HeroRequest) => {
		set({ isLoading: true });
		set({ error: null });
		try {
			const resp = await api.hero.addNewHeroBoard(body);
			if ('data' in resp) set({ isSuccess: true });
		} catch (error) {
			set({ error: returnAppError(error) });
		} finally {
			set({ isLoading: false });
		}
	},
	deleteHeroBoard: async (id) => {
		set({ isLoading: true });
		set({ error: null });
		try {
			await api.hero.removeHero(id);
		} catch (error) {
			set({ error: returnAppError(error) });
		} finally {
			set({ isLoading: false });
		}
	},
}));
