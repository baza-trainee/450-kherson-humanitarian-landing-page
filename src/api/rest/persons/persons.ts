import { commonPatch } from '~api/common/commonPatch';
import type { PersonRequest } from '~api/types/backend/requests/PersonRequest';
import type { ListsResponse } from '~api/types/backend/responses/ListsResponse';

export const addNewPerson = (listId: string, body: PersonRequest) =>
	commonPatch<ListsResponse, PersonRequest>(`/order/${listId}`, body);
