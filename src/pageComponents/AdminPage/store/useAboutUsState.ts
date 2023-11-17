import { create } from 'zustand';

import { api } from '~api/index';
import type { AboutUs } from '~api/types/aboutUs/aboutUs';
// import type { AboutUsFund } from '~api/types/aboutUs/aboutUsFund';
import type { AboutUsFundRequest } from '~api/types/backend/requests/AboutUsFundRequest';
import type { AboutUsRequest } from '~api/types/backend/requests/AboutUsRequest';
import type { ErrorResponse } from '~api/types/backend/responses/ErrorResponse';
import { returnAppError } from '~helpers/returnAppError';

interface UseAboutUsState {
	isModalOnSuccessSaveOpen: boolean;
	isLoading: boolean;
	error: ErrorResponse | null;
	aboutUsData: AboutUs | null;
	getAboutUsDataById: (id: string) => Promise<void>;
	updateAboutUsDataBoard: (body: AboutUsRequest, id: string) => Promise<void>;
	updateAboutUsFundDataBoard: (body: AboutUsFundRequest) => Promise<void>;
	setIsModalOnSuccessSaveClose: () => void;
}
export const useAboutUsState = create<UseAboutUsState>((set) => ({
	isModalOnSuccessSaveOpen: false,
	isLoading: false,
	error: null,
	aboutUsData: null,
	setIsModalOnSuccessSaveClose: () => {
		set({ isModalOnSuccessSaveOpen: false });
	},
	getAboutUsDataById: async (id) => {
		set({ isLoading: true });
		set({ error: null });
		try {
			const resp =
				id === 'fund' ? await api.aboutUs.getAboutUsFund() : await api.aboutUs.getAboutUs(id);
			if ('data' in resp) set({ aboutUsData: resp.data });

			if (resp && 'error' in resp) set({ error: resp.error });
		} catch (error) {
			set({ error: returnAppError(error) });
		} finally {
			set({ isLoading: false });
		}
	},
	updateAboutUsFundDataBoard: async (body) => {
		set({ isLoading: true });
		set({ error: null });
		try {
			const resp = await api.aboutUs.updateAboutUsFund(body);
			if ('data' in resp) {
				set({ aboutUsData: resp.data });
				set({ isModalOnSuccessSaveOpen: true });
			}
			if (resp && 'error' in resp) set({ error: resp.error });
		} catch (error) {
			set({ error: returnAppError(error) });
		} finally {
			set({ isLoading: false });
		}
	},
	updateAboutUsDataBoard: async (body, id) => {
		set({ isLoading: true });
		set({ error: null });
		try {
			const resp = await api.aboutUs.updateAboutUs(body, id);
			if ('data' in resp) {
				set({ aboutUsData: resp.data });
				set({ isModalOnSuccessSaveOpen: true });
			}
			if (resp && 'error' in resp) set({ error: resp.error });
		} catch (error) {
			set({ error: returnAppError(error) });
		} finally {
			set({ isLoading: false });
		}
	},
}));
