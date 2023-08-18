import { NavigationList } from '~components/NavigationList/NavigationList';

import { navigation } from '../HeaderLayout/navigation';
import { documents } from './documents';

import s from './FooterLayout.module.scss';

export function TwoLists() {
	return (
		<div className={s.rightContent}>
			<NavigationList navigation={navigation} variant="footer" navStyle={s.navigation} linkStyle={s.underline} />
			<NavigationList
				download
				target="_blank"
				navigation={documents}
				variant="footer"
				navStyle={s.navigation}
				linkStyle={s.underline}
			/>
		</div>
	);
}
