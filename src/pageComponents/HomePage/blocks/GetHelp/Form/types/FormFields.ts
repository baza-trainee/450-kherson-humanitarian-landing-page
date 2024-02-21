export interface FormFields {
	surname: string;
	name: string;
	patronymic: string;

	email: string;
	populationCity: string;
	populationStreet: string;
	populationHouseNumber: number;
	populationApartmentNumber: number;

	idpCertificateNumber: string;

	disabilityCertificateNumber: string;
	birthCertificateNumber: string;

	movementArea: string;
	movementCity: string;

	phone: string;
	consent: boolean;
}
