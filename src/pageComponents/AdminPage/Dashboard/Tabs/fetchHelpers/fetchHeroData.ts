import { api } from '~api/index';

import type { Tab } from '../Tabs';

export async function fetchHeroData() {
	const resp = await api.hero.getHeroIds();
	let tabData: Tab[] = [];

	if ('data' in resp && resp.data) {
		tabData = resp.data.map((tab, i) => {
			return {
				title: `Банер ${i + 1}`,
				id: tab,
			};
		});
	}

	return {
		tabs: tabData,
		isEditable: true,
	};
}
