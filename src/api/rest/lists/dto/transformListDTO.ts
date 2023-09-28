import type { ListResponse } from '~api/types/backend/responses/ListResponse';
import type { HelpCategories } from '~api/types/getHelpBlock/HelpCategories';
import type { List } from '~api/types/lists/List';

export function transformListDTO(list: ListResponse): List {
	const categories: Record<string, HelpCategories> = {
		temp_moved: 'idp',
		invalid: 'invalid',
		child: 'child',
	};

	let category: List['category'] = 'idp';

	if (list?.type === 'temp_moved' || list?.type === 'invalid' || list?.type === 'child') {
		category = categories[list.type];
	}

	let persons;
	if (list?.persons) {
		persons = list.persons.map((person) => ({
			surname: person.surname || '',
			name: person.name || '',
			patronymic: person.patrname || '',

			populationStreet: person.street || '',
			populationHouseNumber: person.building || '',
			populationApartmentNumber: person.apartment || '',

			certificateNumber: person.certificateNumber || '',

			movementArea: person.regionFrom || '',
			movementCity: person.settlementFrom || '',

			email: person.email || '',
			phone: person.phone || '',
		}));
	}

	return {
		category,
		persons: persons || [],
		personsRegistered: list.confirmedPersons || 0,
		availableSets: list.maxQuantity || 0,
		issueDate: list.issueDate ? new Date(list.issueDate).toLocaleDateString() : '',
		issueTime: list.issueDate
			? new Date(list.issueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
			: '',
		listStatus: list.status || '',
		id: list._id || '',
	};
}
