import { deleteCommon } from '~api/common/deleteCommon';
import { getCommon } from '~api/common/getCommon';
import { patchCommon } from '~api/common/pathCommon';
import { postCommon } from '~api/common/postCommon';
import type { ListRequest } from '~api/types/backend/Requests/ListRequest';
import type { PersonRequest } from '~api/types/backend/Requests/PersonRequest';
import type { ApiResponse } from '~api/types/backend/Responses/ApiResponse';
import type { ListResponse } from '~api/types/backend/Responses/ListResponse';

type ListsResponse = ListResponse[];

export const getActiveListsQuantity = (): Promise<ApiResponse<ListsResponse>> =>
	getCommon<ListsResponse>('orders/quantity', { status: 'active' });

export const getListsByCategory = (type: string): Promise<ApiResponse<ListsResponse>> => getCommon('orders', { type });

export const getListById = (listId: string): Promise<ApiResponse<ListsResponse>> => getCommon(`order/${listId}`);

export const addNewList = (body: ListRequest): Promise<ApiResponse<ListsResponse>> => postCommon('orders', body);

export const removeList = (listId: string): Promise<ApiResponse<ListsResponse>> => deleteCommon(`order/${listId}`);

export const addNewPerson = (listId: string, body: PersonRequest): Promise<ApiResponse<ListsResponse>> =>
	patchCommon(`order/${listId}`, body);
