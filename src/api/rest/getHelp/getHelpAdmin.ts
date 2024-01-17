import { commonGet } from '~api/common/commonGet';
import { commonPut } from '~api/common/commonPut';
import type { GetHelpRequests } from '~api/types/backend/requests/GetHelpRequests';
import type { GetHelpResponse } from '~api/types/backend/responses/GetHelpResponse';

import { transformGetHelpDTO } from './dto/transformGetHelpDTO';

export const getGetHelp = () =>
	commonGet<GetHelpResponse>('/issue-point').then((resp) => {
		if ('data' in resp) return { data: transformGetHelpDTO(resp.data) };
		return { error: resp };
	});

export const putGetHelp = (body: GetHelpRequests) =>
	commonPut<GetHelpResponse, GetHelpRequests>('/issue-point', body).then((resp) => {
		if ('data' in resp) return { data: transformGetHelpDTO(resp.data) };
		return { error: resp };
	});
