import { useListsState } from '~/pageComponents/AdminPage/store/useListsState';
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

	const { isLoading, error, lists } = useListsState((state) => ({
		isLoading: state.isLoading,
		error: state.error,
		lists: state.lists,
	}));

	return (
		<>
			{(isLoading || !lists) && <Loader />}
			{!isLoading && activeTabId && (
				<>
					{lists && <ListTable lists={lists} />}
					<ModalAddList category={activeTabId} />
				</>
			)}
		</>
	);
}
