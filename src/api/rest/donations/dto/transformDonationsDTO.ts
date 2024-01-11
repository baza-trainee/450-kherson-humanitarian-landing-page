import type { DonationResponse } from '~api/types/backend/responses/DonationResponse';
import type { DonationsResponse } from '~api/types/backend/responses/DonationsResponse';

export function transformDonationDTO(donation: DonationResponse) {
	return {
		id: donation.id || '',
		currency: donation.currency || '',
		recipient: donation.recipient || '',
		IBAN: donation.IBAN || '',
		IPN: donation.IPN || '',
		paymentPurpose: donation.paymentPurpose || '',
	};
}

export function transformDonationsDTO(donations: DonationsResponse) {
	return donations.map((donation) => transformDonationDTO(donation));
}
