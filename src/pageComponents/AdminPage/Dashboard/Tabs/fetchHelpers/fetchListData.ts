import { getActiveListsDTO } from '~api/dto/list/getActiveListsDTO';
import { api } from '~api/index';

import type { TabsData } from '../Tabs';

export const fetchListData = async (): Promise<TabsData> => {
	const resp = await api.lists.getActiveLists();
	let data;
	if ('data' in resp) data = getActiveListsDTO(resp.data);

	return {
		tabs: [
			{
				name: 'idp',
				title: 'Допомога ВПО',
				id: data?.idp.id || '',
			},
			{
				name: 'invalid',
				title: 'Допомога людям з інвалідністю',
				id: data?.invalid.id || '',
			},
			{
				name: 'child',
				title: 'Допомога дітям',
				id: data?.child.id || '',
			},
		],
		isEditable: false,
	};
};
