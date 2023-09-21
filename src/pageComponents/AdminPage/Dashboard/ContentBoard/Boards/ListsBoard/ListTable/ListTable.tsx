import { useState } from 'react';

import { useRouter } from 'next/router';

import { ModalRemove } from '~/pageComponents/AdminPage/ModalRemove/ModalRemove';
import { useListsState } from '~/pageComponents/AdminPage/store/useListsState';
import { useTabsState } from '~/pageComponents/AdminPage/store/useTabsState';
import { api } from '~api/index';
import type { CategoryList } from '~api/types/Admin/Lists/CategoryList';
import { Icon } from '~components/Icon/Icon';
import { Label } from '~components/Label/Label';
import type { Column } from '~components/Table/Table';
import { Table } from '~components/Table/Table';
import type { NotificationTypes } from '~components/types/NotificationTypes';
import { ROUTES } from '~constants/ROUTES';
import { useLoaderOverlay } from '~hooks/useLoaderOverlay';

interface ListTableProps {
	lists: CategoryList[] | null;
}

type StatusTypes = Record<
	string,
	{
		type: NotificationTypes;
		title: string;
	}
>;

const statusTypes: StatusTypes = {
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

export function ListTable({ lists }: ListTableProps) {
	const router = useRouter();

	const { LoaderOverlay, showLoaderOverlay } = useLoaderOverlay();

	const [isModalRemoveOpen, setIsModalRemoveOpen] = useState(false);

	const [clickedListId, setClickedListId] = useState('');

	const { getListsByCategory } = useListsState((state) => ({
		getListsByCategory: state.getListsByCategory,
	}));

	const { activeTabId } = useTabsState((state) => ({
		activeTabId: state.activeTabId,
	}));

	if (!lists) return;

	const handleDownloadListFileOnClick = async (listId: string) => {
		const resp = await api.exportList.getListFileEndpointById(listId);
		if ('data' in resp) window.open(resp.data.downloadUrl, '_blank');
	};

	const handleShowListOnClick = async (listId: string) => {
		showLoaderOverlay();
		router.push(`${ROUTES.admin}/list?id=${listId}`);
	};

	const handleRemoveOnClick = async (listId: string) => {
		setClickedListId(listId);
		setIsModalRemoveOpen(true);
	};

	const handleOnModalRemoveYesClick = async () => {
		const resp = await api.lists.removeList(clickedListId);
		if ('data' in resp) {
			if (activeTabId) await getListsByCategory(activeTabId);
		}
	};

	const columns: Column<(typeof lists)[number]>[] = [
		{
			key: 'personsRegistered',
			header: 'Зареєстровано осіб',
		},
		{
			key: 'availableSets',
			header: 'Доступно наборів',
		},
		{
			key: 'issueDate',
			header: 'Дата видачі',
		},
		{
			key: 'issueTime',
			header: 'Початок видачі',
		},
		{
			key: 'listStatus',
			header: 'Статус',
			cell: (row) => (
				<Label type={statusTypes[row.rowCell?.value as keyof typeof statusTypes]?.type}>
					{statusTypes[row.rowCell?.value as keyof typeof statusTypes]?.title || ''}
				</Label>
			),
		},
		{
			key: 'download',
			width: '48px',
			cell: (row) => (
				<Icon
					icon="icon--download"
					onClick={() => handleDownloadListFileOnClick(row.rowAllValues.id)}
				/>
			),
		},
		{
			key: 'show',
			width: '48px',
			cell: (row) => (
				<Icon icon="icon--eye" onClick={() => handleShowListOnClick(row.rowAllValues.id)} />
			),
		},
		{
			key: 'remove',
			width: '48px',
			cell: (row) => (
				<Icon icon="icon--trash" onClick={() => handleRemoveOnClick(row.rowAllValues.id)} />
			),
		},
	];

	return (
		<>
			<Table columns={columns} data={lists} />
			<LoaderOverlay />
			<ModalRemove
				isModalOpen={isModalRemoveOpen}
				setIsModalOpen={setIsModalRemoveOpen}
				onYesClick={handleOnModalRemoveYesClick}
			/>
		</>
	);
}
