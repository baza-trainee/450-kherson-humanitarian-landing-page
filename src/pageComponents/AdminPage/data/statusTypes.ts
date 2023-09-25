import type { NotificationTypes } from '~components/types/NotificationTypes';

export type StatusTypes = Record<
	string,
	{
		type: NotificationTypes;
		title: string;
	}
>;

export const statusTypes: StatusTypes = {
	ready: {
		type: 'alert',
		title: 'В черзі',
	},
	active: {
		type: 'warn',
		title: 'В процесі',
	},
	done: {
		type: 'success',
		title: 'Завершено',
	},
	archived: {
		type: 'info',
		title: 'Архів',
	},
};
