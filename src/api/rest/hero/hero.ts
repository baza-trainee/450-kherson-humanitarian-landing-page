import { commonDelete } from '~api/common/commonDelete';
import { commonGet } from '~api/common/commonGet';
import { commonPatch } from '~api/common/commonPatch';
import { commonPost } from '~api/common/commonPost';
import type { HeroRequest } from '~api/types/backend/requests/HeroRequest';
import type { HeroIdsResponse } from '~api/types/backend/responses/HeroIdsResponse';
import type { HeroResponse } from '~api/types/backend/responses/HeroResponse';

// type HeroesResponse = HeroResponse[];
// export const getHeroBanners = () =>
// 	commonGet<HeroesResponse>('/heroes').then((resp) => {
// 		console.log('api getHeroBanners', resp);
// 		if ('data' in resp) {
// 			return { data: resp.data };
// 		}
// 		return { error: resp };
// 	});

export const getHeroIds = () =>
	commonGet<HeroIdsResponse>('/heroes/ids').then((resp) => {
		if ('data' in resp) {
			return { data: resp.data };
		}
		return { error: resp };
	});

export const getHeroBoardById = (heroId: string) =>
	commonGet<HeroResponse>(`/hero/${heroId}`).then((resp) => {
		if ('data' in resp) return { data: resp.data };
		return { error: resp };
	});

export const addNewHeroBoard = (body: HeroRequest) =>
	commonPost<HeroResponse, HeroRequest>('/hero', body);

export const changeHeroBoardById = (body: HeroRequest) =>
	commonPatch<HeroResponse, HeroRequest>('/hero', body);

export const removeHero = (heroId: string) => commonDelete<HeroResponse>(`/order/${heroId}`);
