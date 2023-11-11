import { commonGet } from '~api/common/commonGet';
import { clientPut } from '~api/common/commonPut';
import type { AboutUsFundRequest } from '~api/types/backend/requests/AboutUsFundRequest';
import type { AboutUsRequest } from '~api/types/backend/requests/AboutUsRequest';
import type { AboutUsFundResponse } from '~api/types/backend/responses/AboutUsFundResponse';
import type { AboutUsResponse } from '~api/types/backend/responses/AboutUsResponse';

import { transformAboutUsDTO } from './dto/transformAboutUsDTO';
import { transformAboutUsFundDTO } from './dto/transformAboutUsFundDTO';

export const getAboutUsFund = () =>
	commonGet<AboutUsFundResponse>('/fund').then((resp) => {
		if ('data' in resp) {
			return { data: transformAboutUsFundDTO(resp.data) };
		}
		return { error: resp };
	});

export const changeAboutUsFund = (body: AboutUsFundRequest) =>
	clientPut<AboutUsFundResponse, AboutUsFundRequest>('/fund/', body).then((resp) => {
		if ('data' in resp) {
			return { data: resp.data };
		}
		return { error: resp };
	});
export const getAboutUsTeam = () =>
	commonGet<AboutUsResponse>('/team').then((resp) => {
		if ('data' in resp) {
			return { data: transformAboutUsDTO(resp.data) };
		}
		return { error: resp };
	});

export const changeAboutUsTeam = (body: AboutUsRequest) =>
	clientPut<AboutUsResponse, AboutUsRequest>('/team/', body).then((resp) => {
		if ('data' in resp) {
			return { data: resp.data };
		}
		return { error: resp };
	});
export const getAboutUsHistory = () =>
	commonGet<AboutUsResponse>('/history').then((resp) => {
		if ('data' in resp) {
			return { data: transformAboutUsDTO(resp.data) };
		}
		return { error: resp };
	});

export const changeAboutUsHistory = (body: AboutUsRequest) =>
	clientPut<AboutUsResponse, AboutUsRequest>('/history/', body).then((resp) => {
		if ('data' in resp) {
			return { data: resp.data };
		}
		return { error: resp };
	});
