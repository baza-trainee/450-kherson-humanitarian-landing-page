import { commonGet } from '~api/common/commonGet';
import { commonPut } from '~api/common/commonPut';
import type { OurAchievementsRequest } from '~api/types/backend/requests/OurAchievementsRequest';
import type { OurAchievementsResponse } from '~api/types/backend/responses/OurAchievementsResponse';

import { transformOurAchievementsDTO } from './dto/transformOurAchievementsDTO';

export const getOurAchievements = () =>
	commonGet<OurAchievementsResponse>('/achievements').then((resp) => {
		if ('data' in resp) return { data: transformOurAchievementsDTO(resp.data) };
		return { error: resp };
	});

export const putOurAchievements = (body: OurAchievementsRequest) =>
	commonPut<OurAchievementsResponse, OurAchievementsRequest>('/achievements', body);
