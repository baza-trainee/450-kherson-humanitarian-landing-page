import type { DocumentsOfMainSite } from '~api/types/footer/DocumentsOfMainSite';
import { NavigationList } from '~components/NavigationList/NavigationList';
import { navigation } from '~components/RootLayout/HeaderLayout/navigation';

import { documents } from '../../data/documents';

import s from './NavigationAndDocuments.module.scss';

interface NavigationAndDocumentsProps {
	documentsData?: DocumentsOfMainSite;
}

export function NavigationAndDocuments({ documentsData }: NavigationAndDocumentsProps) {
	return (
		<div className={s.NavigationAndDocuments}>
			<NavigationList
				navigation={navigation}
				variant="footer"
				navStyle={s.navigation}
				linkStyle={s.underline}
			/>
			<NavigationList
				target="_blank"
				navigation={documentsData || documents}
				variant="footer"
				navStyle={s.navigation}
				linkStyle={s.underline}
			/>
		</div>
	);
}
