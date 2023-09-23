import { commonPatch } from '~api/common/commonPatch';
import type { PersonRequest } from '~api/types/requests/PersonRequest';
import type { ListsResponse } from '~api/types/responses/ListsResponse';

export const addNewPerson = (listId: string, body: PersonRequest) =>
	commonPatch<ListsResponse, PersonRequest>(`/order/${listId}`, body).then((resp) => {
		console.log(resp);
		return resp;
	});
