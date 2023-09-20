import type { AxiosRequestConfig } from 'axios';

import { commonDelete } from '~api/common/commonDelete';
import { commonGet } from '~api/common/commonGet';
import { commonPost } from '~api/common/commonPost';
import type { ListRequest } from '~api/types/backend/requests/ListRequest';
import type { ListResponse } from '~api/types/backend/responses/ListResponse';
import type { ListsResponse } from '~api/types/backend/responses/ListsResponse';

import { transformActiveListsQuantityDTO } from './dto/list/transformActiveListsQuantityDTO';
import { transformCategoryListsDTO } from './dto/list/transformCategoryListsDTO';
import { transformListDTO } from './dto/list/transformListDTO';

export const getActiveListsQuantity = () =>
	commonGet<ListsResponse>('/orders/quantity', { params: { status: 'active' } }).then((resp) => {
		if ('data' in resp) return { data: transformActiveListsQuantityDTO(resp.data) };
		return { error: resp };
	});

export const getListsByCategory = (category: string) =>
	commonGet<ListsResponse>('/orders', { params: { type: category } }).then((resp) => {
		if ('data' in resp) return { data: transformCategoryListsDTO(resp.data) };
		return { error: resp };
	});

export const getListById = (listId: string, requestConfig: AxiosRequestConfig) =>
	commonGet<ListResponse>(`/order/${listId}`, requestConfig).then((resp) => {
		if ('data' in resp) return { data: transformListDTO(resp.data) };
		return { error: resp };
	});

export const addNewList = (body: ListRequest) =>
	commonPost<ListsResponse, ListRequest>('/orders', body);

export const removeList = (listId: string) => commonDelete<ListsResponse>(`/order/${listId}`);
