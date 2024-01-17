import type { ProjectsResponse } from '~api/types/backend/responses/ProjectsResponse';

export function transformProjectsDTO(list: ProjectsResponse) {
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
