import { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useFieldArray, useForm } from 'react-hook-form';

import { useRouter } from 'next/router';

import ActionButtons from '~/pageComponents/AdminPage/components/ActionButtons/ActionButtons';
import { transformProjectsFormData } from '~/pageComponents/AdminPage/Dashboard/ContentBoard/Boards/ProjectsBoard/helpers/transformProjectsFormData';
import { useProjectsState } from '~/pageComponents/AdminPage/store/useProjectsState';
import { useTabsState } from '~/pageComponents/AdminPage/store/useTabsState';
import type { ProjectsPictureRequest } from '~api/types/backend/requests/ProjectsPictureRequest';
import type { PictureResponse } from '~api/types/backend/responses/PictureResponse';
import { Button } from '~components/Buttons/Button';
import { Icon } from '~components/Icon/Icon';
import { ImgUpload } from '~components/ImgUpload/ImgUpload';
import { TextArea } from '~components/inputs/TextArea/TextArea';
import { TextInput } from '~components/inputs/TextInput/TextInput';
import { TextInputWithCounter } from '~components/inputs/TextInput/TextInputWithCounter';
import { Loader } from '~components/Loader/Loader';
import { ModalPop } from '~components/ModalPop/ModalPop';
import { MIN_CAROUSEL_ITEMS } from '~constants/MIN_CAROUSEL_ITEMS';
import type { CompressImage } from '~helpers/compressImage';
import { compressImage } from '~helpers/compressImage';

import { fetchProjectsData } from '../../../Tabs/fetchHelpers/fetchProjectsData';
import { EmptyBoard } from '../EmptyBoard/EmptyBoard';
import { ImgUploadWithLabel } from './components/ImgUploadWithLabel/ImgUploadWithLabel';
import RadioBlock from './components/RadioBlock/RadioBlock';

import s from './ProjectsBoard.module.scss';

export interface FormFields {
	projectStatus: string;
	videoLink: string;
	subTitle: string;
	text: string;
	areaCompletedWorks: string;
	projectDuration: string;
	projectText: string;
	pictures: PictureResponse[] | { image: FileList; id?: string }[];
	mainPicture: string | FileList;
}

export default function ProjectsBoard() {
	const [isModalMinTabsLengthOpen, setIsModalMinTabsLengthOpen] = useState(false);

	const router = useRouter();
	const { query } = router;

	const [errorMessage, setErrorMessage] = useState('');

	const { tabsData, isTabsClickBlocked, getTabsData, setIsTabsClickBlocked } = useTabsState(
		(state) => ({
			tabsData: state.tabsData,
			isTabsClickBlocked: state.isTabsClickBlocked,
			getTabsData: state.getTabsData,
			setIsTabsClickBlocked: state.setIsTabsClickBlocked,
		}),
	);

	const {
		isLoading,
		projectBoardData,
		isModalOnSuccessSaveOpen,
		setIsModalOnSuccessSaveClose,
		stateError,
		getProjectsBoardById,
		updateProjectBoardById,
		addNewProjectBoard,
		deleteProjectBoardById,
		addNewEmptyProjectsBoard,
	} = useProjectsState((state) => ({
		isLoading: state.isLoading,
		projectBoardData: state.projectBoardData,
		isModalOnSuccessSaveOpen: state.isModalOnSuccessSaveOpen,
		setIsModalOnSuccessSaveClose: state.setIsModalOnSuccessSaveClose,
		stateError: state.error,
		getProjectsBoardById: state.getProjectsBoardById,
		updateProjectBoardById: state.updateProjectBoardById,
		addNewProjectBoard: state.addNewProjectBoard,
		deleteProjectBoardById: state.deleteProjectBoardById,
		addNewEmptyProjectsBoard: state.addNewEmptyProjectsBoard,
	}));

	const {
		register,
		control,
		handleSubmit,
		formState: { errors, isValid },
		setValue,
		watch,
		reset,
		clearErrors,
	} = useForm<FormFields>({
		mode: 'onSubmit',
	});

	const { fields, remove, append } = useFieldArray<FormFields>({
		name: 'pictures',
		control,
	});

	useEffect(() => {
		const fetchData = async () => {
			if (query?.id) {
				await getProjectsBoardById(query?.id.toString());
			}
		};
		//*set data from server into state
		if (query?.id !== 'new' && query?.id !== 'empty') fetchData();
		//* if new form, set empty state
		else addNewEmptyProjectsBoard();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query?.id]);

	useEffect(() => {
		//*set message to show in Modal Error
		if (stateError) {
			if (stateError.status === 406)
				setErrorMessage('Не правильно введені дані. Можливо є зайві символи');
			if (stateError.status === 500) setErrorMessage(stateError.message);
		}
	}, [stateError]);

	useEffect(() => {
		if (projectBoardData) {
			setValue('mainPicture', projectBoardData.mainPicture.image);
			setValue('pictures', projectBoardData.pictures);
			setValue('projectStatus', projectBoardData.projectStatus);
			setValue('subTitle', projectBoardData.subTitle);
			setValue('videoLink', projectBoardData.videoLink);
			setValue('text', projectBoardData.text);
			setValue('areaCompletedWorks', projectBoardData.areaCompletedWorks);
			setValue('projectDuration', projectBoardData.projectDuration);
			setValue('projectText', projectBoardData.projectText);
			clearErrors();
			setIsTabsClickBlocked(false);
		}

		if (query?.id === 'new') {
			setValue('mainPicture', '');
			setValue('projectStatus', 'ready');
			setValue('subTitle', '');
			setValue('pictures', []);
			setValue('videoLink', '');
			setValue('text', '');
			setValue('areaCompletedWorks', '');
			setValue('projectDuration', '');
			setValue('projectText', '');
			clearErrors();
			setIsTabsClickBlocked(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [projectBoardData, query?.id]);

	useEffect(() => {
		fields.length !== projectBoardData?.pictures.length
			? setIsTabsClickBlocked(true)
			: setIsTabsClickBlocked(false);

		watch((value) => {
			if (
				value.subTitle !== projectBoardData?.subTitle ||
				value.mainPicture !== projectBoardData?.mainPicture.image ||
				value.projectStatus !== projectBoardData?.projectStatus ||
				value.videoLink !== projectBoardData?.videoLink ||
				value.text !== projectBoardData?.text ||
				value.projectDuration !== projectBoardData?.projectDuration ||
				value.areaCompletedWorks !== projectBoardData?.areaCompletedWorks ||
				value.projectText !== projectBoardData?.projectText ||
				(projectBoardData &&
					value.pictures &&
					value.pictures.some(
						(picture, index) =>
							!projectBoardData.pictures[index] ||
							picture?.image !== projectBoardData.pictures[index]?.image,
					))
			) {
				setIsTabsClickBlocked(true);
			} else {
				setIsTabsClickBlocked(false);
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watch, projectBoardData, fields]);

	const registers = {
		mainPicture: register('mainPicture', {
			required: projectBoardData?.mainPicture.image ? false : true, //---need to have empty state
		}),
		subTitle: register('subTitle', {
			required: true,
		}),
		projectStatus: register('projectStatus', {
			required: true,
		}),
		videoLink: register('videoLink'),
		text: register('text', {
			required: true,
		}),
		areaCompletedWorks: register('areaCompletedWorks', {
			required: true,
		}),
		projectDuration: register('projectDuration', {
			required: true,
		}),
		projectText: register('projectText', {
			required: true,
		}),
	};

	const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
		const formData = transformProjectsFormData(data);

		const newPictures: ProjectsPictureRequest[] = [];
		let mainImageObj = {} as CompressImage;
		let imageObj = {} as CompressImage;

		if (data.mainPicture.length > 0 && typeof data.mainPicture !== 'string') {
			mainImageObj = await compressImage(data.mainPicture[0]);
		}

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		for (const [_, value] of data.pictures.entries()) {
			if (value.image instanceof FileList) {
				imageObj = await compressImage(value.image[0] as File);
				newPictures.push({
					picture: {
						mime_type: imageObj.type,
						image: imageObj.image.split(',')[1],
					},
					isMain: false,
					id: value.id ? value.id : undefined,
				});
			} else {
				newPictures.push({
					picture: {
						mime_type: 'text/plain',
						image: value.image,
					},
					isMain: false,
					id: value.id ? value.id : undefined,
				});
			}
		}

		const projectId = query?.id && query?.id !== 'new' ? query.id.toString() : '';

		const newProjectBoardData =
			typeof data.mainPicture !== 'string'
				? {
						...formData,
						mainPicture: {
							picture: {
								mime_type: mainImageObj.type,
								image: mainImageObj.image.split(',')[1],
							},
							isMain: true,
						},
						pictures: newPictures,
						id: projectId,
				  }
				: {
						...formData,
						pictures: newPictures,
						id: projectId,
				  };

		if (query?.id === 'new') await addNewProjectBoard(newProjectBoardData);
		if (query?.id !== 'new' && newPictures.length >= MIN_CAROUSEL_ITEMS) {
			await updateProjectBoardById(newProjectBoardData);
		} else setIsModalMinTabsLengthOpen(true);
		// *after saving into server need to set IsBlocked to false in order to click between tabs
		setIsTabsClickBlocked(false);
		await getTabsData(fetchProjectsData);
	};

	const handleOnModalCancelYesClick = async () => {
		if (projectBoardData) {
			reset({
				mainPicture: projectBoardData.mainPicture.image,
				projectStatus: projectBoardData.projectStatus,
				subTitle: projectBoardData.subTitle,
				videoLink: projectBoardData.videoLink,
				text: projectBoardData.text,
				projectDuration: projectBoardData.projectDuration,
				areaCompletedWorks: projectBoardData.areaCompletedWorks,
				projectText: projectBoardData.projectText,
				pictures: projectBoardData.pictures,
			});
			setIsTabsClickBlocked(false);
		}
	};

	const handleOnModalRemoveYesClick = async () => {
		if (query?.id && tabsData?.tabs) {
			if (tabsData.tabs.length >= MIN_CAROUSEL_ITEMS) {
				await deleteProjectBoardById(query?.id.toString());
				await getTabsData(fetchProjectsData);
			} else setIsModalMinTabsLengthOpen(true);
		}
	};

	const handleAddNewImageOnClick = () => {
		append({
			image: '',
		});
	};

	const handleOnModalIsLengthClose = async () => {
		if (query?.id) await getProjectsBoardById(query?.id.toString());
		setIsModalMinTabsLengthOpen(false);
	};

	return (
		<>
			{(isLoading || !projectBoardData) && query?.id !== 'empty' && <Loader />}
			{!isLoading && query?.id && query?.id === 'empty' && <EmptyBoard />}
			{!isLoading && query?.id !== 'empty' && projectBoardData && (
				<form className={s.form}>
					<ImgUploadWithLabel
						label="Головне фото"
						register={registers.mainPicture}
						watch={watch}
						errors={errors}
						required
					/>
					<TextInputWithCounter
						register={registers.subTitle}
						required
						label="Заголовок"
						placeholder=""
						maxLength={125}
						errors={errors}
						showInfo
					/>
					<RadioBlock register={registers.projectStatus} />
					{fields.map((field, index) => {
						return (
							<ImgUpload
								key={field.id}
								register={register(`pictures.${index}.image`, {
									required:
										projectBoardData.pictures && projectBoardData.pictures[index]
											? false
											: true,
								})}
								watch={watch}
								errors={errors}
								handleImageDelete={() => remove(index)}
							/>
						);
					})}
					<Button className={s.button} type="secondary" onClick={handleAddNewImageOnClick}>
						<Icon
							icon="icon--plus"
							colors={{
								default: 'var(--color--primary-2)',
							}}
						/>
						Фото
					</Button>
					<TextInput
						register={registers.videoLink}
						label="Посилання на відео"
						placeholder=""
						maxLength={170}
						errors={errors}
						showInfo
					/>
					<TextArea
						rows={7}
						register={registers.text}
						required
						label="Опис проєкту"
						placeholder=""
						maxLength={503}
						errors={errors}
						showInfo
					/>
					<TextInputWithCounter
						register={registers.areaCompletedWorks}
						required
						label="Об'єм виконаних робіт"
						placeholder=""
						maxLength={100}
						errors={errors}
						showInfo
					/>
					<TextInputWithCounter
						register={registers.projectDuration}
						required
						label="Тривалість проєкту:"
						placeholder=""
						maxLength={29}
						errors={errors}
						showInfo
					/>
					<TextArea
						rows={5}
						register={registers.projectText}
						required
						label="Звіт по проєкту."
						placeholder=""
						maxLength={248}
						errors={errors}
						showInfo
					/>
					<ActionButtons
						onRemove={query?.id !== 'new' ? handleOnModalRemoveYesClick : undefined}
						onReset={handleOnModalCancelYesClick}
						onSave={handleSubmit(onSubmit)}
						isDataValid={isValid}
						isDisabled={!isTabsClickBlocked}
					/>
					{
						isModalOnSuccessSaveOpen && (
							<ModalPop
								isOpen={isModalOnSuccessSaveOpen}
								onClose={setIsModalOnSuccessSaveClose}
								title="Вітаємо!"
								leftButton={() => (
									<Button onClick={setIsModalOnSuccessSaveClose}>Ок</Button>
								)}
							>
								Ваші дані успішно збережено
							</ModalPop>
						) //add modal on success saving data on server
					}
					{errorMessage && (
						<ModalPop
							type="error"
							title="Помилка при збереженні!"
							isOpen={!!errorMessage}
							onClose={() => setErrorMessage('')}
						>
							{errorMessage}
						</ModalPop>
					)}
					{isModalMinTabsLengthOpen && (
						<ModalPop
							type="error"
							isOpen={isModalMinTabsLengthOpen}
							onClose={handleOnModalIsLengthClose}
							title="Увага!"
							leftButton={() => <Button onClick={handleOnModalIsLengthClose}>Ок</Button>}
						>
							Мінімальна кількість проєктів або фото у проєкті не повинна бути менше{' '}
							{MIN_CAROUSEL_ITEMS}.
						</ModalPop>
					)}
				</form>
			)}
		</>
	);
}
