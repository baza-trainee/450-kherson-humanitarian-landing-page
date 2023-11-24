import type { AboutUsResponse } from '~api/types/backend/responses/AboutUsResponse';

export function transformAboutUsDTO(aboutUsBoard: AboutUsResponse) {
	return {
		image: aboutUsBoard.picture.image,
		title: aboutUsBoard.title,
		text: aboutUsBoard.text.split('/n').join('\n'),
	};
}
