import type { PictureRequest } from './PictureRequest';

export interface ProjectsPictureRequest {
	picture: PictureRequest;
	isMain: boolean;
	id?: string;
}
