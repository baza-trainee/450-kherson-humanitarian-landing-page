export interface Donation {
	id?: string;
	currency: string;
	recipient: string;
	IBAN: string;
	IPN: string;
	paymentPurpose: string;
}
