import type { ListQuantityResponse } from '~api/types/backend/responses/ListQuantityResponse';
import type { GetHelpLists } from '~api/types/getHelpBlock/GetHelpLists';
import type { HelpCategories } from '~api/types/getHelpBlock/HelpCategories';

export function transformActiveListsQuantityDTO(lists: ListQuantityResponse[]): GetHelpLists {
	const categories: Record<string, Record<string, HelpCategories>> = {
		temp_moved: { name: 'idp' },
		invalid: { name: 'invalid' },
		child: { name: 'child' },
	};

	return Object.fromEntries(
		Object.entries(categories).map((category) => {
			const currentTabData = lists.find((list) => list.type === category[0]);
			return [
				category[1].name as HelpCategories,
				{
					id: currentTabData?._id || '',
					personsRegistered: currentTabData?.confirmedPersons || 0,
					availableSets: currentTabData?.maxQuantity || 0,
				},
			];
		}),
	) as GetHelpLists;
}
