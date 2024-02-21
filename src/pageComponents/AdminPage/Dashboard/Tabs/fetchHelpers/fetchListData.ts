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

