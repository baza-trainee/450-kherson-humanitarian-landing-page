import type { GetHelpLists } from '~api/types/GetHelp/GetHelpLists';
import type { HelpCategories } from '~api/types/GetHelp/HelpCategories';
import type { ListQuantityResponse } from '~api/types/responses/ListQuantityResponse';

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
