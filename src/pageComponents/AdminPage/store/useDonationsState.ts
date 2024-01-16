import { create } from 'zustand';

import { api } from '~api/index';
import type { DonationRequest } from '~api/types/backend/requests/DonationRequest';
import type { ErrorResponse } from '~api/types/backend/responses/ErrorResponse';
import type { Donation } from '~api/types/donations/donation';
import { returnAppError } from '~helpers/returnAppError';

interface UseDonationsState {
	isModalOnSuccessSaveOpen: boolean;
	isLoading: boolean;
	error: ErrorResponse | null;
	donationsBoardData: Donation | null;
	getDonationsBoardById: (id: string) => Promise<void>;
	updateDonationsBoardById: (body: DonationRequest) => Promise<void>;
	addNewEmptyDonationsBoard: () => void;
	addNewDonationsBoard: (body: DonationRequest) => Promise<void>;
	deleteDonationsBoardById: (id: string) => Promise<void>;
	setIsModalOnSuccessSaveClose: () => void;
}

export const useDonationsState = create<UseDonationsState>((set) => ({
	isModalOnSuccessSaveOpen: false,
	isLoading: false,
	error: null,
	donationsBoardData: null,
	getDonationsBoardById: async (id) => {
		set({ isLoading: true });
		set({ error: null });
		try {
			if (id !== 'new') {
				const resp = await api.donations.getDonationsBoardById(id);
				if ('data' in resp) {
					set({ donationsBoardData: resp.data });
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
	updateDonationsBoardById: async (body: DonationRequest) => {
		set({ isLoading: true });
		set({ error: null });
		try {
			const resp = await api.donations.updateDonationsBoard(body);
			if ('data' in resp) {
				set({ donationsBoardData: resp.data });
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
	addNewEmptyDonationsBoard: () => {
		set({ error: null });
		set({
			donationsBoardData: {
				currency: '',
				recipient: '',
				IBAN: '',
				IPN: '',
				paymentPurpose: '',
			},
		});
	},
	addNewDonationsBoard: async (body: DonationRequest) => {
		set({ isLoading: true });
		set({ error: null });
		try {
			const resp = await api.donations.addNewDonationsBoard(body);
			if ('data' in resp) set({ isModalOnSuccessSaveOpen: true });
		} catch (error) {
			set({ error: returnAppError(error) });
		}
	},
	deleteDonationsBoardById: async (id) => {
		set({ isLoading: true });
		set({ error: null });
		set({ donationsBoardData: null });
		try {
			await api.donations.removeDonations(id);
		} catch (error) {
			set({ error: returnAppError(error) });
		} finally {
			set({ isLoading: false });
		}
	},
}));
