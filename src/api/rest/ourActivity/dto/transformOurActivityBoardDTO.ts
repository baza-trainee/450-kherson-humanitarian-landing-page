import type { OurActivitiesResponse } from '~api/types/backend/responses/OurActivitiesResponse';
import type { OurActivityResponse } from '~api/types/backend/responses/OurActivityResponse';

export function transformOurActivityBoardDTO(data: OurActivityResponse) {
	return {
		src: data.picture.image || '',
		id: data.id || '',
	};
}

export function transformOurActivitiesDTO(data: OurActivitiesResponse) {
	return data.map((activity) => transformOurActivityBoardDTO(activity)).reverse();
}
