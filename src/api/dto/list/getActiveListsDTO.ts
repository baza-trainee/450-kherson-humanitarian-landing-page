import type { GetHelpLists } from '~api/types/GetHelp/GetHelpLists';
import type { HelpCategories } from '~api/types/GetHelp/HelpCategories';
import type { ListResponse } from '~api/types/Responses/ListResponse';

export function getActiveListsDTO(lists: ListResponse[]): GetHelpLists {
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
					personsCount: currentTabData?.confirmedPersons || 0,
					maxQuantity: currentTabData?.maxQuantity || 0,
				},
			];
		}),
	) as GetHelpLists;
}
