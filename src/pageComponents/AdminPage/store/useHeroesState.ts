import { create } from 'zustand';

import { api } from '~api/index';
import type { HeroRequest } from '~api/types/backend/requests/HeroRequest';
import type { ErrorResponse } from '~api/types/backend/responses/ErrorResponse';
import type { Hero } from '~api/types/hero/Hero';
import { returnAppError } from '~helpers/returnAppError';

interface UseHeroesState {
	isModalOnSuccessSaveOpen: boolean;
	isLoading: boolean;
	error: ErrorResponse | null;
	heroBoardData: Hero | null;
	getHeroBoardById: (id: string) => Promise<void>;
	addNewEmptyHeroBoard: () => Promise<void>;
	updateHeroBoard: (body: HeroRequest) => Promise<void>;
	addNewHeroBoard: (body: HeroRequest) => Promise<void>;
	deleteHeroBoard: (id: string) => Promise<void>;
	setIsModalOnSuccessSaveClose: () => void;
}

export const useHeroesState = create<UseHeroesState>((set) => ({
	isModalOnSuccessSaveOpen: false,
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
	setIsModalOnSuccessSaveClose: () => {
		set({ isModalOnSuccessSaveOpen: false });
	},
	addNewEmptyHeroBoard: async () => {
		set({
			heroBoardData: {
				image: '',
				imageGradient: 'lightGradient',
				title: '',
				titleColor: 'blue',
				subtitle: '',
				subtitleColor: 'blue',
			},
		});
	},
	updateHeroBoard: async (body: HeroRequest) => {
		set({ isLoading: true });
		set({ error: null });
		try {
			const resp = await api.hero.updateHeroBoard(body);
			if ('data' in resp) {
				if (resp.data) {
					set({ heroBoardData: resp.data });
					set({ isModalOnSuccessSaveOpen: true });
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
			if ('data' in resp) set({ isModalOnSuccessSaveOpen: true });
		} catch (error) {
			set({ error: returnAppError(error) });
		}
	},
	deleteHeroBoard: async (id) => {
		set({ isLoading: true });
		set({ error: null });
		set({ heroBoardData: null });
		try {
			await api.hero.removeHero(id);
		} catch (error) {
			set({ error: returnAppError(error) });
		} finally {
			set({ isLoading: false });
		}
	},
}));
