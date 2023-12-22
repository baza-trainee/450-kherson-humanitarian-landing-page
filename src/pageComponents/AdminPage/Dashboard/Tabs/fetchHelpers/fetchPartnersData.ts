import { api } from '~api/index';

import type { Tab } from '../Tabs';

export async function fetchPartnersData() {
	const resp = await api.partners.getPartnersIds();

	let tabsData: Tab[] = [];

	if ('data' in resp && resp.data) {
		tabsData = resp.data.map((tab, i) => {
			return {
				title: `Лого ${i + 1}`,
				id: tab,
			};
		});
	}

	return {
		tabs: tabsData,
		isEditable: true,
	};
}
