import { useEffect } from 'react';

import { useListsState } from '~/pageComponents/AdminPage/store/useListsState';
import { useTabsState } from '~/pageComponents/AdminPage/store/useTabsState';
import type { ListRequest } from '~api/types/backend/requests/ListRequest';
import { Loader } from '~components/Loader/Loader';

import { ListTable } from './ListTable/ListTable';
import { ModalAddList } from './ModalAddList/ModalAddList';

export const categories: Record<string, ListRequest['type']> = {
	idp: 'temp_moved',
	invalid: 'invalid',
	child: 'child',
};

export function ListsBoard() {
	const activeTabId = useTabsState((state) => state.activeTabId);

	const { isLoading, listsBoardData, getBoardDataById } = useListsState((state) => ({
		isLoading: state.isLoading,
		listsBoardData: state.listsBoardData,
		getBoardDataById: state.getBoardDataById,
	}));

	useEffect(() => {
		const fetchData = async () => {
			if (activeTabId) getBoardDataById(activeTabId);
		};
		if (activeTabId) fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeTabId]);

	return (
		<>
			{(isLoading || !listsBoardData) && <Loader />}
			{!isLoading && activeTabId && listsBoardData && (
				<>
					<ListTable lists={listsBoardData} />
					<ModalAddList />
				</>
			)}
		</>
	);
}
