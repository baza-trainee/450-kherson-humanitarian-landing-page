import type { FormFields } from '~/pageComponents/AdminPage/Dashboard/ContentBoard/Boards/ProjectsBoard/ProjectsBoard';

type StatusMapping = Record<string, 'funding-await' | 'in-process' | 'completed'>;

export function transformProjectsFormData(data: FormFields) {
	const statusMapping: StatusMapping = {
		ready: 'funding-await',
		active: 'in-process',
		done: 'completed',
	};

	const status = statusMapping[data.projectStatus];

	return {
		stage: status,
		subTitle: data.subTitle,
		videoLink: data.videoLink || ' ',
		text: data.text.replaceAll('\n', '/n'),
		projectDuration: data.projectDuration,
		areaCompletedWorks: data.areaCompletedWorks,
		projectText: data.projectText.replaceAll('\n', '/n'),
	};
}
