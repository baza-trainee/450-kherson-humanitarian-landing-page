import type { PictureResponse } from '../backend/responses/PictureResponse';

export interface Project {
	id?: string;
	projectStatus: string;
	videoLink: string;
	subTitle: string;
	text: string;
	areaCompletedWorks: string;
	projectDuration: string;
	projectText: string;
	pictures: PictureResponse[];
	mainPicture: PictureResponse;
}
