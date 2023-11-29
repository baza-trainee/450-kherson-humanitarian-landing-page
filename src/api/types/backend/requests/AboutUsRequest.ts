import type { PictureRequest } from './PictureRequest';

export interface AboutUsRequest {
	picture?: PictureRequest;
	title: string;
	text: string;
}
