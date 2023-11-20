import { commonDelete } from '~api/common/commonDelete';
import { commonGet } from '~api/common/commonGet';
import { commonPost } from '~api/common/commonPost';
import { commonPut } from '~api/common/commonPut';
import type { OurActivityRequest } from '~api/types/backend/requests/OurActivityRequest';
import type { HeroIdsResponse } from '~api/types/backend/responses/OurActivityIdsResponse';
import type { OurActivityResponse } from '~api/types/backend/responses/OurActivityResponse';

import { transformBoardDTO } from './dto/transformBoardDTO';

export const getOurActivityIds = () =>
	commonGet<HeroIdsResponse>('/activities/ids').then((resp) => {
		if ('data' in resp) {
			return { data: resp.data };
		}
		return { error: resp };
	});

export const addNewOurActivityBoard = (body: OurActivityRequest) =>
	commonPost<OurActivityResponse, OurActivityRequest>('/activities', body);

export const getBoardOurActivityById = (id: string) =>
	commonGet<OurActivityResponse>(`/activity/${id}`).then((resp) => {
		if ('data' in resp) return { data: transformBoardDTO(resp.data) };
		return { error: resp };
	});

export const deleteOurActivityBoardById = (id: string) =>
	commonDelete<OurActivityResponse>(`/activity/${id}`).then((resp) => {
		if ('data' in resp) return { data: transformBoardDTO(resp.data) };
		return { error: resp };
	});

export const updateOurActivityBoard = (body: OurActivityRequest) =>
	commonPut<OurActivityResponse, OurActivityRequest>('/activity/', body).then((resp) => {
		if ('data' in resp) return { data: transformBoardDTO(resp.data) };
		return { error: resp };
	});
