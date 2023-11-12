import { commonGet } from '~api/common/commonGet';
import { commonPut } from '~api/common/commonPut';
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
	commonPut<AboutUsFundResponse, AboutUsFundRequest>('/fund/', body).then((resp) => {
		if ('data' in resp) {
			return { data: transformAboutUsFundDTO(resp.data) };
		}
		return { error: resp };
	});

export const getAboutUs = (id: string) =>
	commonGet<AboutUsResponse>(`/${id}`).then((resp) => {
		if ('data' in resp) {
			return { data: transformAboutUsDTO(resp.data) };
		}
		return { error: resp };
	});

export const changeAboutUs = (body: AboutUsRequest, id: string) =>
	commonPut<AboutUsResponse, AboutUsRequest>(`/${id}`, body).then((resp) => {
		if ('data' in resp) {
			return { data: transformAboutUsDTO(resp.data) };
		}
		return { error: resp };
	});
