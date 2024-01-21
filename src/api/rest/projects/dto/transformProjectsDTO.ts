import type { ProjectResponse } from '~api/types/backend/responses/ProjectResponse';
import type { ProjectsResponse } from '~api/types/backend/responses/ProjectsResponse';

export function transformProjectDTO(list: ProjectResponse) {
	const statusMapping = {
		'funding-await': 'ready',
		'in-process': 'active',
		completed: 'done',
	};

	const status = statusMapping[list.stage];

	const listPicturesTransform = list.pictures.map((item) => ({
		id: `${item.id}`,
		image: `${item.image}`,
	}));

	const picturesDTO = list.pictures.length > 0 ? listPicturesTransform : [];

	const mainPictureTransform = {
		id: list.mainPicture?.id ? `${list.mainPicture?.id}` : '',
		image: list.mainPicture?.image ? `${list.mainPicture?.image}` : '',
	};

	return {
		id: list.id,
		projectStatus: status,
		videoLink: list.videoLink,
		subTitle: list.subTitle,
		text: list.text.replaceAll('/n', '\n'),
		areaCompletedWorks: list.areaCompletedWorks,
		projectDuration: list.projectDuration,
		projectText: list.projectText.replaceAll('/n', '\n'),
		pictures: picturesDTO,
		mainPicture: mainPictureTransform,
	};
}
export function transformProjectsDTO(list: ProjectsResponse) {
	return list.map((item) => transformProjectDTO(item)).reverse();
}
