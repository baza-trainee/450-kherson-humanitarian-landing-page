import type { PartnersResponse } from '~api/types/backend/responses/PartnersResponse';

export function transformPartnersDTO(data: PartnersResponse) {
	return {
		image: data.picture.image,
		id: data.id,
	};
}
