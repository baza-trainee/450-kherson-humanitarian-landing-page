import { commonGet } from '~api/common/commonGet';
import { commonPost } from '~api/common/commonPost';
import type { PictureRequest } from '~api/types/backend/requests/PictureRequest';
import type { OurActivityResponse } from '~api/types/backend/responses/OurActivityResponse';

import { transformBoardDTO } from './dto/transformBoardDTO';
import { transformTabsListDTO } from './dto/transformTabsListDTO';

// TODO: ask Volodymyr if he return only Id or not
export const getTabsList = () =>
	commonGet<OurActivityResponse[]>('/activities').then((resp) => {
		if ('data' in resp) return { data: transformTabsListDTO(resp.data) };
		return { error: resp };
	});

export const addNewBoard = (body: PictureRequest) =>
	commonPost<OurActivityResponse, PictureRequest>('/activities', body);

export const getBoardById = (id: string) =>
	commonGet<OurActivityResponse>(`/activity/${id}`).then((resp) => {
		if ('data' in resp) return { data: transformBoardDTO(resp.data) };
		return { error: resp };
	});
