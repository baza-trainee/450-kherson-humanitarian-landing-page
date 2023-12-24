/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from 'zustand';

import { api } from '~api/index';
import type { ProjectsRequest } from '~api/types/backend/requests/ProjectsRequest';
import type { ErrorResponse } from '~api/types/backend/responses/ErrorResponse';
import type { Project } from '~api/types/projects/Project';
import { returnAppError } from '~helpers/returnAppError';

export interface UseProjectsState {
	isModalOnSuccessSaveOpen: boolean;
	isLoading: boolean;
	error: ErrorResponse | null;
	projectBoardData: Project | null;
	activeId: string;
	getProjectsBoardById: (id: string) => Promise<void>;
	updateProjectBoardById: (body: ProjectsRequest) => Promise<void>;
	addNewProjectBoard: (body: ProjectsRequest) => Promise<void>;
	deleteProjectBoardById: (id: string) => Promise<void>;
	setIsModalOnSuccessSaveClose: () => void;
	addNewEmptyProjectsBoard: () => void;
}

export const useProjectsState = create<UseProjectsState>((set) => ({
	isModalOnSuccessSaveOpen: false,
	isLoading: false,
	error: null,
	projectBoardData: null,
	activeId: '',
	getProjectsBoardById: async (id) => {
		set({ isLoading: true });
		set({ error: null });
		try {
			if (id !== 'new') {
				const resp = await api.projects.getProjectsBoardById(id);
				if ('data' in resp && resp.data) {
					set({ projectBoardData: resp.data });
				} else set({ error: resp.error });
			}
		} catch (error) {
			set({ error: returnAppError(error) });
		} finally {
			set({ isLoading: false });
		}
	},
	setIsModalOnSuccessSaveClose: () => {
		set({ isModalOnSuccessSaveOpen: false });
	},
	addNewEmptyProjectsBoard: () => {
		set({ error: null });
		set({
			projectBoardData: {
				projectStatus: '',
				videoLink: '',
				subTitle: '',
				text: '',
				areaCompletedWorks: '',
				projectDuration: '',
				projectText: '',
				pictures: [],
				mainPicture: { id: '', image: '' },
			},
		});
	},
	updateProjectBoardById: async (body: ProjectsRequest) => {
		set({ isLoading: true });
		set({ error: null });
		try {
			const resp = await api.projects.updateProjectBoard({
				areaCompletedWorks: body.areaCompletedWorks,
				projectDuration: body.projectDuration,
				projectText: body.projectText,
				stage: body.stage,
				subTitle: body.subTitle,
				text: body.text,
				videoLink: body.videoLink,
				id: body.id,
			});

			if ('data' in resp && resp.data) {
				set({ isModalOnSuccessSaveOpen: true });
				// For mainPicture
				if (body.mainPicture && body.id) {
					if (resp.data.mainPicture.id && body.mainPicture.picture.image) {
						await api.projects.deleteProjectBoardPictureById(
							body.id,
							resp.data.mainPicture.id,
						);
					}
					await api.projects.addProjectBoardPictureById(body.id, body.mainPicture);
				}
				// For pictures
				if (body.pictures && body.id) {
					//DELETE picture
					const idsForDelete = resp.data.pictures.reduce((acc: string[], obj) => {
						if (body.pictures && !body.pictures.some((o) => o.id === obj.id)) {
							acc.push(obj.id);
						}
						return acc;
					}, []);

					for (const id of idsForDelete) {
						await api.projects.deleteProjectBoardPictureById(body.id, id);
					}

					for (const [index, value] of body.pictures.entries()) {
						// UPDATE Picture
						if (value.id && value.picture.mime_type !== 'text/plain') {
							await api.projects.deleteProjectBoardPictureById(body.id, value.id);
							await api.projects.addProjectBoardPictureById(body.id, {
								picture: {
									mime_type: value.picture.mime_type,
									image: value.picture.image,
								},
								isMain: value.isMain,
							});
						}
						// ADD if new Picture
						if (!value.id) {
							await api.projects.addProjectBoardPictureById(body.id, {
								picture: {
									mime_type: value.picture.mime_type,
									image: value.picture.image,
								},
								isMain: value.isMain,
							});
						}
					}
				}
			} else {
				set({ error: resp.error });
			}
		} catch (error) {
			set({ error: returnAppError(error) });
		} finally {
			set({ isLoading: false });
		}
	},
	addNewProjectBoard: async (body) => {
		set({ isLoading: true });
		set({ error: null });

		try {
			const resp = await api.projects.addNewProjectBoard({
				areaCompletedWorks: body.areaCompletedWorks,
				projectDuration: body.projectDuration,
				projectText: body.projectText,
				stage: body.stage,
				subTitle: body.subTitle,
				text: body.text,
				videoLink: body.videoLink,
			});
			if ('data' in resp) {
				set({ isModalOnSuccessSaveOpen: true });

				if (body.mainPicture)
					await api.projects.addProjectBoardPictureById(resp.data.id, body.mainPicture);
				if (body.pictures) {
					for (const [index, value] of body.pictures.entries()) {
						await api.projects.addProjectBoardPictureById(resp.data.id, body.pictures[index]);
					}
				}
			}
		} catch (error) {
			set({ error: returnAppError(error) });
		}
	},
	deleteProjectBoardById: async (id: string) => {
		set({ isLoading: true });
		set({ error: null });
		set({ projectBoardData: null });
		try {
			await api.projects.deleteProjectBoardById(id);
		} catch (error) {
			set({ error: returnAppError(error) });
		} finally {
			set({ isLoading: false });
		}
	},
}));
