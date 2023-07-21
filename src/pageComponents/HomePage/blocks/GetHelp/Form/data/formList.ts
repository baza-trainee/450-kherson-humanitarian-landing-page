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
			'name',
			'surname',
			'populationPoint',
			'street',
			'houseNumber',
			'apartmentNumber',
			'documentType',
			'passportSeries',
			'passportNumber',
			'idCard',
			'identificationNumber',
			'idpCertificateNumber',
			'movementArea',
			'movementCity',
			'numberOfFamilyMembers',
			'phone',
			'consent',
		],
	},
	{
		label: 'Допомога людям з інвалідністю',
		fieldList: [
			'name',
			'surname',
			'patronymic',
			'populationPoint',
			'street',
			'houseNumber',
			'apartmentNumber',
			'documentType',
			'passportSeries',
			'passportNumber',
			'idCard',
			'disabilityCertificateNumber',
			'identificationNumber',
			'idpCertificateNumber',
			'movementArea',
			'movementCity',
			'numberOfFamilyMembers',
			'phone',
			'consent',
		],
	},
	{
		label: 'Допомога дітям',
		fieldList: [
			'name',
			'surname',
			'patronymic',
			'populationPoint',
			'street',
			'houseNumber',
			'apartmentNumber',
			'documentType',
			'passportSeries',
			'passportNumber',
			'idCard',
			'identificationNumber',
			'idpCertificateNumber',
			'idpCertificateOrBirthCertificateNumber',
			'movementArea',
			'movementCity',
			'numberOfFamilyMembers',
			'phone',
			'consent',
		],
	},
];
