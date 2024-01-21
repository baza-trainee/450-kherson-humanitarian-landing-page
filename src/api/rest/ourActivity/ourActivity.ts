import { commonDelete } from '~api/common/commonDelete';
import { commonGet } from '~api/common/commonGet';
import { commonPost } from '~api/common/commonPost';
import { commonPut } from '~api/common/commonPut';
import type { OurActivityRequest } from '~api/types/backend/requests/OurActivityRequest';
import type { OurActivitiesResponse } from '~api/types/backend/responses/OurActivitiesResponse';
import type { OurActivityResponse } from '~api/types/backend/responses/OurActivityResponse';
import type { TabsIdsResponse } from '~api/types/backend/responses/TabsIdsResponse';

import {
	transformOurActivitiesDTO,
	transformOurActivityBoardDTO,
} from './dto/transformOurActivityBoardDTO';

export const getOurActivityIds = () =>
	commonGet<TabsIdsResponse>('/activities/ids').then((resp) => {
		if ('data' in resp) return { data: resp.data };
		return { error: resp };
	});

export const getOurActivities = () =>
	commonGet<OurActivitiesResponse>('/activities').then((resp) => {
		if ('data' in resp) return { data: transformOurActivitiesDTO(resp.data) };
		return { error: resp };
	});

export const addNewOurActivityBoard = (body: OurActivityRequest) =>
	commonPost<OurActivityResponse, OurActivityRequest>('/activities', body);

export const getBoardOurActivityById = (id: string) =>
	commonGet<OurActivityResponse>(`/activity/${id}`).then((resp) => {
		if ('data' in resp) return { data: transformOurActivityBoardDTO(resp.data) };
		return { error: resp };
	});

export const deleteOurActivityBoardById = (id: string) =>
	commonDelete<OurActivityResponse>(`/activity/${id}`).then((resp) => {
		if ('data' in resp) return { data: transformOurActivityBoardDTO(resp.data) };
		return { error: resp };
	});

export const updateOurActivityBoard = (body: OurActivityRequest) =>
	commonPut<OurActivityResponse, OurActivityRequest>('/activity/', body).then((resp) => {
		if ('data' in resp) return { data: transformOurActivityBoardDTO(resp.data) };
		return { error: resp };
	});
