import type { AboutUsFundResponse } from '~api/types/backend/responses/AboutUsFundResponse';

export function transformAboutUsFundDTO(aboutUsBoard: AboutUsFundResponse) {
	return {
		image: aboutUsBoard.picture.image,
	};
}
