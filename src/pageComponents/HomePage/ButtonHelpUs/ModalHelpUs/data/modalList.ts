import { ibanData } from './ibanData';

interface ModalField {
	title: string;
	text: string;
	id: number;
}

interface ModalCollection {
	label: string;
	fieldList: ModalField[];
}

type ModalList = ModalCollection[];

export const modalList: ModalList = [
	{
		label: 'USD',
		fieldList: [
			{ id: 1, title: 'Одержувач:', text: 'Громадська організація 4.5.0. Кривий Ріг' },
			{ id: 2, title: 'IBAN:', text: ibanData['USD'] },
			{ id: 3, title: 'ЄДРПОУ:', text: '44867603' },
			{ id: 4, title: 'Призначення платежу:', text: 'Благодійний внесок' },
		],
	},
	{
		label: 'EUR',
		fieldList: [
			{ id: 1, title: 'Одержувач:', text: 'Громадська організація 4.5.0. Кривий Ріг' },
			{ id: 2, title: 'IBAN:', text: ibanData['EUR'] },
			{ id: 3, title: 'ЄДРПОУ:', text: '44867603' },
			{ id: 4, title: 'Призначення платежу:', text: 'Благодійний внесок' },
		],
	},
	{
		label: 'PLN',
		fieldList: [
			{ id: 1, title: 'Одержувач:', text: 'Громадська організація 4.5.0. Кривий Ріг' },
			{ id: 2, title: 'IBAN:', text: ibanData['PLN'] },
			{ id: 3, title: 'ЄДРПОУ:', text: '44867603' },
			{ id: 4, title: 'Призначення платежу:', text: 'Благодійний внесок' },
		],
	},
];
