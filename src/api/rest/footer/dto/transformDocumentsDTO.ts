import type { DocumentsResponse } from '~api/types/backend/responses/DocumentsResponse';
import { BASE_URL } from '~constants/BASE_URL';

export function transformDocumentsDTO(documents: DocumentsResponse) {
	return {
		rules: documents.rules || '0',
		contract: documents.contract || '0',
		privacy: documents.privacy || '0',
		statut: documents.statut || '0',
	};
}
export function transformDocumentsOfMainSiteDTO(documents: DocumentsResponse) {
	const addUrl = process.env.NODE_ENV === 'development' ? `${BASE_URL}` : '';
	return [
		{
			id: 1,
			href: documents.rules !== '0' ? `${addUrl}${documents.rules}` : '',
			name: 'Правила та умови',
		},
		{
			id: 2,
			href: documents.contract !== '0' ? `${addUrl}${documents.contract}` : '',
			name: 'Договір публічної оферти',
		},
		{
			id: 3,
			href: documents.privacy !== '0' ? `${addUrl}${documents.privacy}` : '',
			name: 'Конфіденційність',
		},
		{
			id: 4,
			href: documents.statut !== '0' ? `${addUrl}${documents.statut}` : '',
			name: 'Статут',
		},
	];
}
