import type { FormFields } from '../types/FormFields';

interface FormInputCollection {
	label: string;
	fieldList: (keyof FormFields)[];
}

type FormList = FormInputCollection[];

export const formList: FormList = [
	{
		label: 'Допомога ВПО',
		fieldList: [
			'surname',
			'name',
			'patronymic',
			'populationCity',
			'populationStreet',
			'populationHouseNumber',
			'populationApartmentNumber',
			'idpCertificateNumber',
			'movementArea',
			'movementCity',
			'email',
			'phone',
			'consent',
		],
	},
	{
		label: 'Допомога людям з інвалідністю',
		fieldList: [
			'surname',
			'name',
			'patronymic',
			'populationCity',
			'populationStreet',
			'populationHouseNumber',
			'populationApartmentNumber',
			'disabilityCertificateNumber',
			'movementArea',
			'movementCity',
			'email',
			'phone',
			'consent',
		],
	},
	{
		label: 'Допомога дітям',
		fieldList: [
			'surname',
			'name',
			'patronymic',
			'populationCity',
			'populationStreet',
			'populationHouseNumber',
			'populationApartmentNumber',
			'birthCertificateNumber',
			'movementArea',
			'movementCity',
			'email',
			'phone',
			'consent',
		],
	},
];
