export async function fetchListData() {
	return {
		tabs: [
			{
				key: 'idp',
				title: 'Допомога ВПО',
				id: 'temp_moved',
			},
			{
				key: 'invalid',
				title: 'Допомога людям з інвалідністю',
				id: 'invalid',
			},
			{
				key: 'child',
				title: 'Допомога дітям',
				id: 'child',
			},
		],
		isEditable: false,
	};
}
export async function fetchHeroData() {
	return {
		tabs: [
			{
				key: 'banner1',
				title: 'Банер 1',
				id: 'banner1',
			},
			{
				key: 'banner2',
				title: 'Банер 2',
				id: 'banner2',
			},
			{
				key: 'banner3',
				title: 'Банер 3',
				id: 'banner3',
			},
		],
		isEditable: false,
	};
}
