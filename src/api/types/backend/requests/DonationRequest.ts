export interface DonationRequest {
	id?: string;
	currency: string;
	recipient: string;
	IBAN: string;
	IPN: string;
	paymentPurpose: string;
}
