import { useBoardsState } from '~/pageComponents/AdminPage/store/useBoardsState';
import { useTabsState } from '~/pageComponents/AdminPage/store/useTabsState';
import type { ListRequest } from '~api/types/requests/ListRequest';
import { Loader } from '~components/Loader/Loader';

import { ListTable } from './ListTable/ListTable';
import { ModalAddList } from './ModalAddList/ModalAddList';

export const categories: Record<string, ListRequest['type']> = {
	idp: 'temp_moved',
	invalid: 'invalid',
	child: 'child',
};

export function ListsBoard() {
	const { activeTabId } = useTabsState((state) => ({
		activeTabId: state.activeTabId,
	}));

	const { isLoading, listsBoardData } = useBoardsState((state) => ({
		isLoading: state.isLoading,
		listsBoardData: state.listsBoardData,
	}));

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
