import { commonDelete } from '~api/common/commonDelete';
import { commonGet } from '~api/common/commonGet';
import { commonPut } from '~api/common/commonPut';
import type { ContactsRequest } from '~api/types/backend/requests/ContactsRequest';
import type { DocumentRequest } from '~api/types/backend/requests/DocumentRequest';
import type { ContactsResponse } from '~api/types/backend/responses/ContactsResponse';
import type { DocumentsResponse } from '~api/types/backend/responses/DocumentsResponse';

export const getContacts = () =>
	commonGet<ContactsResponse>('/contacts').then((resp) => {
		if ('data' in resp) {
			return { data: resp.data };
		}
		return { error: resp };
	});

export const getDocuments = () =>
	commonGet<DocumentsResponse>('/documents').then((resp) => {
		if ('data' in resp) {
			return { data: resp.data };
		}
		return { error: resp };
	});

export const updateContacts = (body: ContactsRequest) =>
	commonPut<ContactsResponse, ContactsRequest>('/contacts', body).then((resp) => {
		if ('data' in resp) {
			return { data: resp.data };
		}
		return { error: resp };
	});

export const updateDocument = (body: DocumentRequest) =>
	commonPut<DocumentsResponse, DocumentRequest>('/document', body).then((resp) => {
		if ('data' in resp) {
			return { data: resp.data };
		}
		return { error: resp };
	});
	export const deleteDocument = (name: string) => commonDelete<DocumentsResponse>(`/document/${name}`);
