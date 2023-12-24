import { api } from '~api/index';

import type { Tab } from '../Tabs';

export async function fetchProjectsData() {
	const resp = await api.projects.getProjectsIds();
	let tabData: Tab[] = [];

	if ('data' in resp && resp.data) {
		tabData = resp.data.map((tab, i) => {
			return {
				title: `Проєкт ${i + 1}`,
				id: tab,
			};
		});
	}

	return {
		tabs: tabData,
		isEditable: true,
	};
}
