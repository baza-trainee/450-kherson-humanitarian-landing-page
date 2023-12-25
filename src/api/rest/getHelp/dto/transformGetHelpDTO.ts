import type { GetHelpResponse } from '~api/types/backend/responses/GetHelpResponse';

export function transformGetHelpDTO(data: GetHelpResponse) {
	return {
		mapUrl: data.geolocation,
		address: data.locationDeliveryPoint,
	};
}
