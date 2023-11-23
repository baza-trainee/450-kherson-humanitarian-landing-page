import { api } from '~api/index';

import type { Tab } from '../Tabs';

export async function fetchDonationsData() {
	const resp = await api.donations.getDonations();
	let tabData: Tab[] = [];

	if ('data' in resp && resp.data) {
		tabData = resp.data.map((tab) => {
			return {
				title: tab.currency,
				id: tab.id ? tab.id : '',
			};
		});
	}

	return {
		tabs: tabData,
		isEditable: true,
	};
}
