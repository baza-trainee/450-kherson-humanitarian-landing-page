import type { CategoryList } from '~api/types/Admin/Lists/CategoryList';
import type { ListResponse } from '~api/types/Responses/ListResponse';

export function getCategoryListsDTO(lists: ListResponse[]): CategoryList[] {
	return lists.map((list) => ({
		personsRegistered: list.confirmedPersons || 0,
		availableSets: list.maxQuantity || 0,
		issueDate: list.issueDate ? new Date(list.issueDate).toLocaleDateString() : '',
		issueTime: list.issueDate
			? new Date(list.issueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
			: '',
		listStatus: list.status || '',
		id: list._id || '',
	}));
}
