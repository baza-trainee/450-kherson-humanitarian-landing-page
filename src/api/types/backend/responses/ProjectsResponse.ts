import type { PictureResponse } from './PictureResponse';

export interface ProjectsResponse {
	id: string;
	title: string;
	stage: 'funding-await' | 'in-process' | 'completed';
	videoLink: string;
	subTitle: string;
	text: string;
	areaCompletedWorks: string;
	projectDuration: string;
	projectText: string;
	pictures: PictureResponse[];
	mainPicture?: PictureResponse;
}
