import type { PictureRequest } from './PictureRequest';

export interface HeroRequest {
	id?: string;
	view: {
		picture?: PictureRequest;
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
