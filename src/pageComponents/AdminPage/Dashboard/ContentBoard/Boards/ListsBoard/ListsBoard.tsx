import { useEffect, useState } from 'react';

import { getCategoryListsDTO } from '~api/dto/list/getCategoryListsDTO';
import { api } from '~api/index';
import type { CategoryList } from '~api/types/Admin/Lists/CategoryList';
import type { ListRequest } from '~api/types/Requests/ListRequest';
import { Loader } from '~components/Loader/Loader';

import { ListTable } from './ListTable/ListTable';
import { ModalAddList } from './ModalAddList/ModalAddList';

interface ListsBoardProps {
	tabId: string;
	tabName: string;
}

export const categories: Record<string, ListRequest['type']> = {
	idp: 'temp_moved',
	invalid: 'invalid',
	child: 'child',
};

export function ListsBoard({ tabId, tabName }: ListsBoardProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const [tabData, setTabData] = useState<CategoryList[] | null>(null);

	useEffect(() => {
		setTabData(null);
		const fetchData = async () => {
			setIsLoading(true);
			setError('');

			const resp = tabName ? await api.lists.getCategoriesList(categories[tabName]) : null;
			if (resp && 'data' in resp) setTabData(getCategoryListsDTO(resp.data));

			setIsLoading(false);
		};
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tabName]);

	return (
		<>
			{isLoading && !tabData && <Loader />}
			{!isLoading && (
				<>
					{tabData && <ListTable lists={tabData} />}
					<ModalAddList category={tabName} />
				</>
			)}
		</>
	);
}
