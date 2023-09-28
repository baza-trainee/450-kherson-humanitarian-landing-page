import type { HelpCategories } from '~api/types/getHelp/HelpCategories';

import type { FormFields } from '../types/FormFields';

interface FormInputCollection {
	name: HelpCategories;
	label: string;
	fieldList: (keyof FormFields)[];
}

type FormList = FormInputCollection[];

export const formList: FormList = [
	{
		name: 'idp',
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
		name: 'invalid',
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
		name: 'child',
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
