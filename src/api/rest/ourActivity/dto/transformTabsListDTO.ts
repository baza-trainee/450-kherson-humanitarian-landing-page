import type { OurActivityResponse } from '~api/types/backend/responses/OurActivityResponse';

// TODO:
export function transformTabsListDTO(data: OurActivityResponse[]) {
	return data.map((boardObj) => ({
		imageUrl: boardObj.picture.image || '',
		id: boardObj.id || '',
	}));
}
