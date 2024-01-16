import type { PartnerResponse } from '~api/types/backend/responses/PartnerResponse';
import type { PartnersResponse } from '~api/types/backend/responses/PartnersResponse';

export function transformPartnerDTO(data: PartnerResponse) {
	return {
		image: data.picture.image,
		id: data.id,
	};
}
export function transformPartnersDTO(data: PartnersResponse) {
	return data.map((partner) => transformPartnerDTO(partner));
}
