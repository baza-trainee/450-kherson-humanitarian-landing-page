import type { ListQuantityResponse } from '~api/types/backend/Responses/ListQuantityResponse';
import type { GetHelpLists } from '~api/types/GetHelp/GetHelpLists';
import type { HelpCategories } from '~api/types/GetHelp/HelpCategories';

export function getActiveListsQuantityDTO(lists: ListQuantityResponse[]): GetHelpLists {
	const tabs: Record<string, Record<string, HelpCategories>> = {
		temp_moved: { name: 'idp' },
		invalid: { name: 'invalid' },
		child: { name: 'child' },
	};

	return Object.fromEntries(
		Object.entries(tabs).map((tab) => {
			const currentTabData = lists.find((list) => list.type === tab[0]);
			return [
				tab[1].name as HelpCategories,
				{
					id: currentTabData?._id || '',
					personsRegistered: currentTabData?.confirmedPersons || 0,
					availableSets: currentTabData?.maxQuantity || 0,
				},
			];
		}),
	) as GetHelpLists;
}
