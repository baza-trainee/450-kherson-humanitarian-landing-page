import type { List } from '~api/types/Admin/Lists/List';
import type { ListResponse } from '~api/types/backend/responses/ListResponse';

export function transformListDTO(list: ListResponse): List {
	if (!list?.persons) return [];
	return list.persons.map((person) => ({
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
