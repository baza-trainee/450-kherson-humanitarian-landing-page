import { NavigationList } from '~components/NavigationList/NavigationList';
import { navigation } from '~components/RootLayout/HeaderLayout/navigation';

import { documents } from '../../data/documents';

import s from './NavigationAndDocuments.module.scss';

export function NavigationAndDocuments() {
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
				navigation={documents}
				variant="footer"
				navStyle={s.navigation}
				linkStyle={s.underline}
			/>
		</div>
	);
}
