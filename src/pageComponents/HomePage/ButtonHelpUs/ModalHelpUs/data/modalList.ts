interface ModalField {
	currency: string;
	recipient: string;
	IBAN: string;
	IPN: string;
	paymentPurpose: string;
}

type ModalList = ModalField[];

export const modalList: ModalList = [
	{
		currency: 'USD',
		recipient: 'Громадська організація 4.5.0. Кривий Ріг',
		IBAN: 'UA693052990000026002020407112',
		IPN: '44867603',
		paymentPurpose: 'Благодійний внесок',
	},
	{
		currency: 'EUR',
		recipient: 'Громадська організація 4.5.0. Кривий Ріг',
		IBAN: 'UA643052990000026002010405629',
		IPN: '44867603',
		paymentPurpose: 'Благодійний внесок',
	},
	{
		currency: 'PLN',
		recipient: 'Громадська організація 4.5.0. Кривий Ріг',
		IBAN: 'UA373052990000026006000405958',
		IPN: '44867603',
		paymentPurpose: 'Благодійний внесок',
	},
	{
		currency: 'UAH',
		recipient: 'Громадська організація 4.5.0. Кривий Ріг',
		IBAN: 'UA173052990000026007020405744',
		IPN: '44867603',
		paymentPurpose: 'Благодійний внесок',
	},
];
