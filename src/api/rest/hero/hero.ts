import { commonDelete } from '~api/common/commonDelete';
import { commonGet } from '~api/common/commonGet';
import { commonPost } from '~api/common/commonPost';
import { commonPut } from '~api/common/commonPut';
import type { HeroRequest } from '~api/types/backend/requests/HeroRequest';
import type { HeroResponse } from '~api/types/backend/responses/HeroResponse';
import type { TabsIdsResponse } from '~api/types/backend/responses/TabsIdsResponse';

import { transformHeroBoardDTO } from './dto/transformHeroBoardDTO';

export const getHeroIds = () =>
	commonGet<TabsIdsResponse>('/heroes/ids').then((resp) => {
		if ('data' in resp) {
			return { data: resp.data };
		}
		return { error: resp };
	});

export const getHeroBoardById = (heroId: string) =>
	commonGet<HeroResponse>(`/hero/${heroId}`).then((resp) => {
		if ('data' in resp) return { data: transformHeroBoardDTO(resp.data) };
		return { error: resp };
	});

export const addNewHeroBoard = (body: HeroRequest) =>
	commonPost<HeroResponse, HeroRequest>('/hero', body);

export const changeHeroBoard = (body: HeroRequest) =>
	commonPut<HeroResponse, HeroRequest>('/hero/', body).then((resp) => {
		if ('data' in resp) {
			return { data: resp.data };
		}
		return { error: resp };
	});

export const removeHero = (heroId: string) => commonDelete<HeroResponse>(`/hero/${heroId}`);
