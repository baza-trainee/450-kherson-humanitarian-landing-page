import type { OurActivityResponse } from '~api/types/backend/responses/OurActivityResponse';

export function transformBoardDTO(data: OurActivityResponse) {
	return {
		imageUrl: data.picture.image || '',
		id: data.id || '',
	};
}
