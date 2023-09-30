import type { PersonResponse } from './PersonResponse';

export interface ListResponse {
	changedDate?: string;
	closeDate?: string;
	confirmedPersons?: number;
	personsCount?: number;
	createdAt?: string;
	createdDate?: string;
	issueDate?: string;
	maxQuantity?: number;
	status?: string;
	type?: string;
	updatedAt?: string;
	_id?: string;
	persons?: PersonResponse[];
}
