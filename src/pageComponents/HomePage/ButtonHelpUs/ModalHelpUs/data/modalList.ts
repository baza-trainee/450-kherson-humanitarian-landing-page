interface ModalFields {
	title: string;
	text: string;
	id: number;
}

interface ModalCollection {
	label: string;
	fieldList: ModalFields[];
}

type ModalList = ModalCollection[];

export const modalList: ModalList = [
	{
		label: 'USD',
		fieldList: [
			{ id: 1, title: 'Одержувач:', text: 'Громадська організація 4.5.0. Кривий Ріг' },
			{ id: 2, title: 'IBAN:', text: 'UA693052990000026002020407112' },
			{ id: 3, title: 'ЄДРПОУ:', text: '44867603' },
			{ id: 4, title: 'Призначення платежу:', text: 'Благодійний внесок' },
		],
	},
	{
		label: 'EUR',
		fieldList: [
			{ id: 1, title: 'Одержувач:', text: 'Громадська організація 4.5.0. Кривий Ріг' },
			{ id: 2, title: 'IBAN:', text: 'UA643052990000026002010405629' },
			{ id: 3, title: 'ЄДРПОУ:', text: '44867603' },
			{ id: 4, title: 'Призначення платежу:', text: 'Благодійний внесок' },
		],
	},
];
