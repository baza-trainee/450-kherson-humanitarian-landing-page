import type { ProjectsPictureRequest } from './ProjectsPictureRequest';

export interface ProjectsRequest {
	id?: string;
	stage: 'funding-await' | 'in-process' | 'completed';
	videoLink: string;
	subTitle: string;
	text: string;
	areaCompletedWorks: string;
	projectDuration: string;
	projectText: string;
	mainPicture?: ProjectsPictureRequest;
	pictures?: ProjectsPictureRequest[];
}
