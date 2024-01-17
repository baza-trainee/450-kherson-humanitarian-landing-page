import { create } from 'zustand';

import { api } from '~api/index';
import type { PartnersRequest } from '~api/types/backend/requests/PartnersRequest';
import type { ErrorResponse } from '~api/types/backend/responses/ErrorResponse';
import type { Partner } from '~api/types/partners/Partner';
import { returnAppError } from '~helpers/returnAppError';

interface PartnersState {
	isModalOnSuccessSaveOpen: boolean;
	isLoading: boolean;
	error: ErrorResponse | null;
	partnersBoardData: Partner | null;
	getPartnersBoardById: (id: string) => Promise<void>;
	addNewEmptyPartnersBoard: () => Promise<void>;
	deletePartnersBoardById: (id: string) => Promise<void>;
	updatePartnersBoard: (body: PartnersRequest) => Promise<void>;
	setIsModalOnSuccessSaveClose: () => void;
	addNewPartnersBoard: (body: PartnersRequest) => Promise<void>;
}

export const usePartnersState = create<PartnersState>((set) => ({
	isModalOnSuccessSaveOpen: false,
	isLoading: false,
	error: null,
	partnersBoardData: null,

	getPartnersBoardById: async (id) => {
		set({ isLoading: true });
		set({ error: null });
		try {
			if (id !== 'new') {
				const resp = await api.partners.getPartnersBoardById(id);
				if ('data' in resp) set({ partnersBoardData: resp.data });
				if (resp && 'error' in resp) set({ error: resp.error });
			}
		} catch (error) {
			set({ error: returnAppError(error) });
		} finally {
			set({ isLoading: false });
		}
	},

	deletePartnersBoardById: async (id) => {
		set({ isLoading: true });
		set({ error: null });
		set({ partnersBoardData: null });
		try {
			await api.partners.deletePartnersBoardById(id);
		} catch (error) {
			set({ error: returnAppError(error) });
		} finally {
			set({ isLoading: false });
		}
	},

	updatePartnersBoard: async (body) => {
		set({ isLoading: true });
		set({ error: null });
		try {
			const resp = await api.partners.updatePartnersBoard(body);
			if ('data' in resp) {
				set({ partnersBoardData: resp.data });
				set({ isModalOnSuccessSaveOpen: true });
			} else {
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

	addNewEmptyPartnersBoard: async () => {
		set({
			partnersBoardData: {
				image: '',
			},
		});
	},

	addNewPartnersBoard: async (body) => {
		set({ isLoading: true });
		set({ error: null });

		try {
			const resp = await api.partners.addNewPartnersBoard(body);
			if ('data' in resp) set({ isModalOnSuccessSaveOpen: true });
		} catch (error) {
			set({ error: returnAppError(error) });
		}
	},
}));
