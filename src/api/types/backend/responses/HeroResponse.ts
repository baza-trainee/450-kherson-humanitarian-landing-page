import type { PictureResponse } from './PictureResponse';

export interface HeroResponse {
	id: string;
	view: {
		picture: PictureResponse;
		color: string;
	};
	title: {
		text: string;
		color: string;
	};
	subtitle: {
		text: string;
		color: string;
	};
}
