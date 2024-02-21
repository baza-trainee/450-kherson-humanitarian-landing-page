import { commonDelete } from '~api/common/commonDelete';
import { commonGet } from '~api/common/commonGet';
import { commonPost } from '~api/common/commonPost';
import { commonPut } from '~api/common/commonPut';
import type { DonationRequest } from '~api/types/backend/requests/DonationRequest';
import type { DonationResponse } from '~api/types/backend/responses/DonationResponse';
import type { DonationsResponse } from '~api/types/backend/responses/DonationsResponse';
import type { TabsIdsResponse } from '~api/types/backend/responses/TabsIdsResponse';

import { transformDonationDTO, transformDonationsDTO } from './dto/transformDonationsDTO';

export const getDonationsIds = () =>
	commonGet<TabsIdsResponse>('/donats/ids').then((resp) => {
		if ('data' in resp) {
			return { data: resp.data };
		}
		return { error: resp };
	});

export const getDonations = () =>
	commonGet<DonationsResponse>('/donats/').then((resp) => {
		if ('data' in resp) {
			return { data: transformDonationsDTO(resp.data) };
		}
		return { error: resp };
	});

export const getDonationsBoardById = (heroId: string) =>
	commonGet<DonationResponse>(`/donat/${heroId}`).then((resp) => {
		if ('data' in resp) return { data: transformDonationDTO(resp.data) };
		return { error: resp };
	});

export const addNewDonationsBoard = (body: DonationRequest) =>
	commonPost<DonationResponse, DonationRequest>('/donats', body);

export const updateDonationsBoard = (body: DonationRequest) =>
	commonPut<DonationResponse, DonationRequest>('/donat/', body).then((resp) => {
		if ('data' in resp) {
			return { data: resp.data };
		}
		return { error: resp };
	});

export const removeDonations = (heroId: string) =>
	commonDelete<DonationResponse>(`/donat/${heroId}`);
