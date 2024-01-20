import type { Contacts } from '~api/types/footer/Contacts';

import type { DocumentsOfMainSite } from './DocumentsOfMainSite';

export interface FooterData {
	contactsData: Contacts;
	documentsData: DocumentsOfMainSite;
}
