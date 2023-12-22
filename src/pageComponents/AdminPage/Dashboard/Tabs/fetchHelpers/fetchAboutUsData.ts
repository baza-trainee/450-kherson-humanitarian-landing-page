export async function fetchAboutUsData() {
	return {
		tabs: [
			{
				title: 'Громадська організація',
				id: 'fund',
			},
			{
				title: 'Наша команда',
				id: 'team',
			},
			{
				title: 'Історія заснування',
				id: 'history',
			},
		],
		isEditable: false,
	};
}
