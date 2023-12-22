export async function fetchFooterData() {
	return {
		tabs: [
			{
				title: 'Контакти',
				id: 'contacts',
			},
			{
				title: 'Документи',
				id: 'documents',
			},
		],
		isEditable: false,
	};
}
