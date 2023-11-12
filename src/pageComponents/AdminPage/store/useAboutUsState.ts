import { create } from 'zustand';

import { api } from '~api/index';
import type { AboutUs } from '~api/types/aboutUs/aboutUs';
// import type { AboutUsFund } from '~api/types/aboutUs/aboutUsFund';
import type { AboutUsFundRequest } from '~api/types/backend/requests/AboutUsFundRequest';
import type { AboutUsRequest } from '~api/types/backend/requests/AboutUsRequest';
import type { ErrorResponse } from '~api/types/backend/responses/ErrorResponse';
import { returnAppError } from '~helpers/returnAppError';

interface UseAboutUsState {
	isSuccess: boolean;
	isLoading: boolean;
	error: ErrorResponse | null;
	aboutUsData: AboutUs | null;
	getAboutUsDataById: (id: string) => Promise<void>;
	changeAboutUsDataBoard: (body: AboutUsRequest, id: string) => Promise<void>;
	changeAboutUsFundDataBoard: (body: AboutUsFundRequest) => Promise<void>;
	setIsSuccess: () => void;
}
export const UseAboutUsState = create<UseAboutUsState>((set) => ({
	isSuccess: false,
	isLoading: false,
	error: null,
	aboutUsData: null,
	setIsSuccess: () => {
		set({ isSuccess: false });
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
	changeAboutUsFundDataBoard: async (body) => {
		try {
			const resp = await api.aboutUs.changeAboutUsFund(body);
			if ('data' in resp) {
				set({ aboutUsData: resp.data });
				set({ isSuccess: true });
			}
			if (resp && 'error' in resp) set({ error: resp.error });
		} catch (error) {
			set({ error: returnAppError(error) });
		} finally {
			set({ isLoading: false });
		}
	},
	changeAboutUsDataBoard: async (body, id) => {
		try {
			const resp = await api.aboutUs.changeAboutUs(body, id);
			if ('data' in resp) {
				set({ aboutUsData: resp.data });
				set({ isSuccess: true });
			}
			if (resp && 'error' in resp) set({ error: resp.error });
		} catch (error) {
			set({ error: returnAppError(error) });
		} finally {
			set({ isLoading: false });
		}
	},
}));
