import { create } from 'zustand';

import { api } from '~api/index';
import type { ContactsRequest } from '~api/types/backend/requests/ContactsRequest';
import type { DocumentRequest } from '~api/types/backend/requests/DocumentRequest';
import type { ErrorResponse } from '~api/types/backend/responses/ErrorResponse';
import type { Contacts } from '~api/types/footer/Contacts';
import type { Documents } from '~api/types/footer/Documents';
import { returnAppError } from '~helpers/returnAppError';

interface UseFooterState {
	isModalOnSuccessSaveOpen: boolean;
	isLoading: boolean;
	error: ErrorResponse | null;
	footerBoardData: Contacts | Documents | null;
	getFooterBoardById: (id: string) => Promise<void>;
	updateContactsData: (body: ContactsRequest) => Promise<void>;
	updateDocumentData: (body: DocumentRequest) => Promise<void>;
	setIsModalOnSuccessSaveClose: () => void;
}

export const useFooterState = create<UseFooterState>((set) => ({
	isModalOnSuccessSaveOpen: false,
	isLoading: false,
	error: null,
	footerBoardData: null,
	getFooterBoardById: async (id) => {
		set({ isLoading: true });
		set({ error: null });
		try {
			const resp =
				id === 'contacts' ? await api.footer.getContacts() : await api.footer.getDocuments();
			if ('data' in resp) {
				set({ footerBoardData: resp.data });
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
	updateContactsData: async (body) => {
		set({ isLoading: true });
		set({ error: null });
		try {
			const resp = await api.footer.updateContacts(body);
			if ('data' in resp) {
				set({ footerBoardData: resp.data });
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
	updateDocumentData: async (body) => {
		set({ isLoading: true });
		set({ error: null });
		try {
			const resp = await api.footer.updateDocument(body);
			if ('data' in resp) {
				set({ footerBoardData: resp.data });
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
}));
