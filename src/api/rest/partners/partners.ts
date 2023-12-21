import { commonDelete } from '~api/common/commonDelete';
import { commonGet } from '~api/common/commonGet';
import { commonPost } from '~api/common/commonPost';
import { commonPut } from '~api/common/commonPut';
import type { PartnersRequest } from '~api/types/backend/requests/PartnersRequest';
import type { PartnersResponse } from '~api/types/backend/responses/PartnersResponse';
import type { TabsIdsResponse } from '~api/types/backend/responses/TabsIdsResponse';

import { transformPartnersDTO } from './dto/transformPartnersDTO';

export const getPartnersIds = () =>
	commonGet<TabsIdsResponse>('/logos/ids').then((resp) => {
		if ('data' in resp) return { data: resp.data };
		return { error: resp };
	});

export const getPartnersBoardById = (id: string) =>
	commonGet<PartnersResponse>(`/logo/${id}`).then((resp) => {
		if ('data' in resp) return { data: transformPartnersDTO(resp.data) };
		return { error: resp };
	});

export const addNewPartnersBoard = (body: PartnersRequest) =>
	commonPost<PartnersResponse, PartnersRequest>('/logos', body);

export const updatePartnersBoard = (body: PartnersRequest) =>
	commonPut<PartnersResponse, PartnersRequest>('/logo/', body).then((resp) => {
		if ('data' in resp) return { data: transformPartnersDTO(resp.data) };
		return { error: resp };
	});

export const deletePartnersBoardById = (id: string) =>
	commonDelete<PartnersResponse>(`/logo/${id}`);
