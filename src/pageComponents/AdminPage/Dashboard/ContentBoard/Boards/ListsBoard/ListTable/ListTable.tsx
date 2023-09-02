import { api } from '~api/index';
import type { CategoryList } from '~api/types/Admin/Lists/CategoryList';
import { Icon } from '~components/Icon/Icon';
import type { Column } from '~components/Table/Table';
import { Table } from '~components/Table/Table';

// import s from './ListTable.module.scss';

interface ListTableProps {
	lists: CategoryList[] | null;
}

// personsRegistered: number;
// availableSets: number;
// issueDate: string;
// issueTime: string;
// listStatus: string;
// id: string;

export function ListTable({ lists }: ListTableProps) {
	if (!lists) return;
	console.log('lists: ', lists);

	const handleRemoveOnClick = async (listId: string) => {
		await api.lists.removeList(listId);
	};

	const columns: Column<(typeof lists)[number]>[] = [
		{
			key: 'personsRegistered',
			header: 'Зареєстровано осіб',
			width: 2,
		},
		{
			key: 'availableSets',
			header: 'Доступно наборів',
			width: 2,
		},
		{
			key: 'issueDate',
			header: 'Дата видачі',
			width: 2,
		},
		{
			key: 'issueTime',
			header: 'Час видачі',
			width: 2,
		},
		{
			key: 'listStatus',
			header: 'Статус',
			width: 2,
		},
		{
			key: 'download',
			width: '48px',
			cell: (row) => <Icon icon="icon--download" onClick={() => console.log(row.rowAllValues.id)} />,
		},
		{
			key: 'show',
			width: '48px',
			cell: (row) => <Icon icon="icon--eye" onClick={() => console.log(row.rowAllValues.id)} />,
		},
		{
			key: 'remove',
			width: '48px',
			cell: (row) => <Icon icon="icon--trash" onClick={() => handleRemoveOnClick(row.rowAllValues.id)} />,
		},
	];

	return <Table columns={columns} data={lists} />;
}
