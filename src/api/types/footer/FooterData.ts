import type { Contacts } from '~api/types/footer/Contacts';
import type { Documents } from '~api/types/footer/Documents';

export interface FooterData {
	contactsData: Contacts;
	documentsData: Documents;
}
