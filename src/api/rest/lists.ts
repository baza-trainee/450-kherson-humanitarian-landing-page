import { deleteCommon } from '~api/common/deleteCommon';
import { getCommon } from '~api/common/getCommon';
import { patchCommon } from '~api/common/pathCommon';
import { postCommon } from '~api/common/postCommon';
import type { ListRequest } from '~api/types/Requests/ListRequest';
import type { PersonRequest } from '~api/types/Requests/PersonRequest';
import type { ApiResponse } from '~api/types/Responses/ApiResponse';
import type { ListResponse } from '~api/types/Responses/ListResponse';

type ListsResponse = ListResponse[];

export const getActiveLists = async (): Promise<ApiResponse<ListsResponse>> => getCommon('/orders?status=active');

export const getCategoriesList = async (category: string): Promise<ApiResponse<ListsResponse>> =>
	getCommon(`/orders?type=${category}`);

export const addNewList = async (body: ListRequest): Promise<ApiResponse<ListsResponse>> => postCommon('/orders', body);

export const removeList = async (listId: string): Promise<ApiResponse<ListsResponse>> =>
	deleteCommon(`/order/${listId}`);

export const addNewPerson = async (listId: string, body: PersonRequest): Promise<ApiResponse<ListsResponse>> =>
	patchCommon(`/order/${listId}`, body);
