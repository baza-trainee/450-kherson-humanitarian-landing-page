import type { DocumentsResponse } from '~api/types/backend/responses/DocumentsResponse';

export function transformDocumentsDTO(documents: DocumentsResponse) {
	return {
		rules: documents.rules || '0',
		contract: documents.contract || '0',
		privacy: documents.privacy || '0',
		statut: documents.statut || '0',
	};
}
