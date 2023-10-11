import { api } from '~api/index';

import type { Tab } from '../Tabs';

export async function fetchOurActivityData() {
	const resp = await api.ourActivity.getTabsList();

	let tabsData: Tab[] = [];
	if ('data' in resp && resp.data) {
		tabsData = resp.data.map((tab, i) => {
			return {
				title: `Фото ${i + 1}`,
				id: tab.id,
			};
		});
	}

	return {
		tabs: tabsData,
		isEditable: true,
	};
}
