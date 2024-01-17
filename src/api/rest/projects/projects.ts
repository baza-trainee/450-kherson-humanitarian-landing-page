import { commonDelete } from '~api/common/commonDelete';
import { commonGet } from '~api/common/commonGet';
import { commonPatch } from '~api/common/commonPatch';
import { commonPost } from '~api/common/commonPost';
import type { ProjectsPictureRequest } from '~api/types/backend/requests/ProjectsPictureRequest';
import type { ProjectsRequest } from '~api/types/backend/requests/ProjectsRequest';
import type { ProjectsResponse } from '~api/types/backend/responses/ProjectsResponse';
import type { TabsIdsResponse } from '~api/types/backend/responses/TabsIdsResponse';

import { transformProjectsDTO } from './dto/transformProjectsDTO';

export const getProjectsIds = () =>
	commonGet<TabsIdsResponse>('/projects/ids').then((resp) => {
		if ('data' in resp) {
			return { data: resp.data };
		}
		return { error: resp };
	});

export const getProjectsBoardById = (projectId: string) =>
	commonGet<ProjectsResponse>(`/project/${projectId}`).then((resp) => {
		if ('data' in resp) {
			return { data: transformProjectsDTO(resp.data) };
		}
		return { error: resp };
	});

export const addNewProjectBoard = (body: ProjectsRequest) =>
	commonPost<ProjectsResponse, ProjectsRequest>('/projects', body);

export const updateProjectBoard = (body: ProjectsRequest) =>
	commonPatch<ProjectsResponse, ProjectsRequest>('/project/', body).then((resp) => {
		if ('data' in resp) {
			return { data: transformProjectsDTO(resp.data) };
		}
		return { error: resp };
	});

export const deleteProjectBoardById = (projectId: string) =>
	commonDelete<ProjectsResponse>(`/project/${projectId}`);

export const addProjectBoardPictureById = (projectId: string, body: ProjectsPictureRequest) =>
	commonPost<ProjectsResponse, ProjectsPictureRequest>(`/project/${projectId}/picture`, body);

export const deleteProjectBoardPictureById = (projectId: string, pictureId: string) =>
	commonDelete<ProjectsResponse>(`/project/${projectId}/picture/${pictureId}`);
