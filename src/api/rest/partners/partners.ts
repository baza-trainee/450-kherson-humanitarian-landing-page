import { commonDelete } from '~api/common/commonDelete';
import { commonGet } from '~api/common/commonGet';
import { commonPost } from '~api/common/commonPost';
import { commonPut } from '~api/common/commonPut';
import type { PartnersRequest } from '~api/types/backend/requests/PartnersRequest';
import type { PartnerResponse } from '~api/types/backend/responses/PartnerResponse';
import type { PartnersResponse } from '~api/types/backend/responses/PartnersResponse';
import type { TabsIdsResponse } from '~api/types/backend/responses/TabsIdsResponse';

import { transformPartnerDTO, transformPartnersDTO } from './dto/transformPartnersDTO';

export const getPartnersIds = () =>
	commonGet<TabsIdsResponse>('/logos/ids').then((resp) => {
		if ('data' in resp) return { data: resp.data };
		return { error: resp };
	});

export const getPartners = () =>
	commonGet<PartnersResponse>('/logos/').then((resp) => {
		if ('data' in resp) return { data: transformPartnersDTO(resp.data) };
		return { error: resp };
	});

export const getPartnersBoardById = (id: string) =>
	commonGet<PartnerResponse>(`/logo/${id}`).then((resp) => {
		if ('data' in resp) return { data: transformPartnerDTO(resp.data) };
		return { error: resp };
	});

export const addNewPartnersBoard = (body: PartnersRequest) =>
	commonPost<PartnerResponse, PartnersRequest>('/logos', body);

export const updatePartnersBoard = (body: PartnersRequest) =>
	commonPut<PartnerResponse, PartnersRequest>('/logo/', body).then((resp) => {
		if ('data' in resp) return { data: transformPartnerDTO(resp.data) };
		return { error: resp };
	});

export const deletePartnersBoardById = (id: string) => commonDelete<PartnerResponse>(`/logo/${id}`);
