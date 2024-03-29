import { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import imageCompression from 'browser-image-compression';
import { useRouter } from 'next/router';

import ActionButtons from '~/pageComponents/AdminPage/components/ActionButtons/ActionButtons';
import { useHeroesState } from '~/pageComponents/AdminPage/store/useHeroesState';
import { useTabsState } from '~/pageComponents/AdminPage/store/useTabsState';
import { Button } from '~components/Buttons/Button';
import { ColorRadioBlock } from '~components/ColorRadio/ColorRadioBlock';
import { ImgUploadTextOverlaid } from '~components/ImgUploadTextOverlaid/ImgUploadTextOverlaid';
import { TextArea } from '~components/inputs/TextArea/TextArea';
import { TextInputWithCounter } from '~components/inputs/TextInput/TextInputWithCounter';
import { Loader } from '~components/Loader/Loader';
import { ModalPop } from '~components/ModalPop/ModalPop';

import { fetchHeroData } from '../../../Tabs/fetchHelpers/fetchHeroData';
import { EmptyBoard } from '../EmptyBoard/EmptyBoard';

import s from './HeroBoard.module.scss';

interface FormFields {
	image: FileList | string;
	imageGradient: string;
	title: string;
	titleColor: string;
	subtitle: string;
	subtitleColor: string;
}

export function HeroBoard() {
	const [gradient, setGradient] = useState<string>('lightGradient');
	const [titleColor, setTitleColor] = useState<string>('blue');
	const [subtitleColor, setSubtitleColor] = useState<string>('blue');
	const [titleValue, setTitleValue] = useState<string>('');
	const [subtitleValue, setSubtitleValue] = useState<string>('');

	const router = useRouter();
	const { query } = router;

	const { isTabsClickBlocked, getTabsData, setIsTabsClickBlocked } = useTabsState((state) => ({
		isTabsClickBlocked: state.isTabsClickBlocked,
		getTabsData: state.getTabsData,
		setIsTabsClickBlocked: state.setIsTabsClickBlocked,
	}));

	const {
		isModalOnSuccessSaveOpen,
		isLoading,
		heroBoardData,
		stateError,
		getHeroBoardById,
		updateHeroBoardById,
		addNewHeroBoard,
		deleteHeroBoardById,
		addNewEmptyHeroBoard,
		setIsModalOnSuccessSaveClose,
	} = useHeroesState((state) => ({
		isModalOnSuccessSaveOpen: state.isModalOnSuccessSaveOpen,
		isLoading: state.isLoading,
		heroBoardData: state.heroBoardData,
		stateError: state.error,
		getHeroBoardById: state.getHeroBoardById,
		updateHeroBoardById: state.updateHeroBoardById,
		addNewHeroBoard: state.addNewHeroBoard,
		deleteHeroBoardById: state.deleteHeroBoardById,
		addNewEmptyHeroBoard: state.addNewEmptyHeroBoard,
		setIsModalOnSuccessSaveClose: state.setIsModalOnSuccessSaveClose,
	}));

	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			if (query?.id) await getHeroBoardById(query?.id.toString());
		};
		//*set data from server into state
		if (query?.id !== 'new' && query?.id !== 'empty') fetchData();
		//* if new form, set empty state
		else addNewEmptyHeroBoard();
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

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		setValue,
		watch,
		reset,
		clearErrors,
	} = useForm<FormFields>({
		mode: 'onSubmit',
	});

	useEffect(() => {
		if (heroBoardData) {
			//* set data from state into form to display
			setValue('image', heroBoardData.image);
			setValue('imageGradient', heroBoardData.imageGradient);
			setValue('title', heroBoardData.title);
			setValue('titleColor', heroBoardData.titleColor);
			setValue('subtitle', heroBoardData.subtitle);
			setValue('subtitleColor', heroBoardData.subtitleColor);
			setTitleValue(heroBoardData.title);
			setSubtitleValue(heroBoardData.subtitle);
			setGradient(heroBoardData.imageGradient);
			setSubtitleColor(heroBoardData.subtitleColor);
			setTitleColor(heroBoardData.titleColor);
			clearErrors();
			setIsTabsClickBlocked(false); //*if new data from server, than not block tabs clicking
		}
		if (query?.id === 'new') {
			//* set empty or default values
			setValue('image', '');
			setValue('imageGradient', 'lightGradient');
			setValue('title', '');
			setValue('titleColor', 'blue');
			setValue('subtitle', '');
			setValue('subtitleColor', 'blue');
			setTitleValue('');
			setSubtitleValue('');
			setGradient('lightGradient');
			setSubtitleColor('blue');
			setTitleColor('blue');
			clearErrors();
			setIsTabsClickBlocked(false); //*if new empty board, than not block tabs clicking
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [heroBoardData, query?.id]);

	const registers = {
		image: register('image', {
			required: heroBoardData?.image ? false : true, //---need to have empty state
		}),
		imageGradient: register('imageGradient', {
			required: true,
		}),
		title: register('title', {
			required: true,
		}),
		titleColor: register('titleColor', {
			required: true,
		}),
		subtitle: register('subtitle', {
			required: true,
		}),
		subtitleColor: register('subtitleColor', {
			required: true,
		}),
	};

	const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
		let image = '',
			type = '';
		const options = {
			maxSizeMB: 0.488,
			maxWidthOrHeight: 1920,
		};

		try {
			if (data.image.length > 0 && typeof data.image !== 'string') {
				const compressedFile = await imageCompression(data.image[0], options);

				await imageCompression
					.getDataUrlFromFile(compressedFile)
					.then((dataImage) => (image = dataImage.toString()));
				type = data.image[0].type;
			} else image = heroBoardData?.image || '';
		} catch (error) {
			console.error('Error imageCompression:', error); //-----------------------------log
		}

		const body = {
			id: query?.id && query?.id !== 'new' ? query?.id.toString() : '',
			view:
				data.image === heroBoardData?.image
					? { color: data.imageGradient }
					: {
							picture: {
								mime_type: type,
								image: image.split(',')[1],
							},
							color: data.imageGradient,
					  },
			title: {
				text: data.title.replaceAll('\n', '/n'),
				color: data.titleColor,
			},
			subtitle: {
				text: data.subtitle,
				color: data.subtitleColor,
			},
		};
		query?.id === 'new' ? await addNewHeroBoard(body) : await updateHeroBoardById(body);
		// *after saving into server need to set IsBlocked to false in order to click between tabs
		setIsTabsClickBlocked(false);
		await getTabsData(fetchHeroData);
	};

	useEffect(() => {
		watch((value) => {
			if (value.imageGradient) setGradient(value.imageGradient);
			if (value.title) setTitleValue(value.title);
			if (value.title === '') setTitleValue('');
			if (value.titleColor) setTitleColor(value.titleColor);
			if (value.subtitle) setSubtitleValue(value.subtitle);
			if (value.subtitle === '') setSubtitleValue('');
			if (value.subtitleColor) setSubtitleColor(value.subtitleColor);
			//* need to check if some changes at form, then set isBlocked to true, in order to block clicking between tabs
			if (
				value.image !== heroBoardData?.image ||
				value.imageGradient !== heroBoardData?.imageGradient ||
				value.subtitle !== heroBoardData?.subtitle ||
				value.subtitleColor !== heroBoardData?.subtitleColor ||
				value.title !== heroBoardData?.title ||
				value.titleColor !== heroBoardData?.titleColor
			) {
				setIsTabsClickBlocked(true); //*if are changes, set block
			} else {
				setIsTabsClickBlocked(false);
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watch, heroBoardData]);

	const handleOnModalCancelYesClick = async () => {
		if (heroBoardData) {
			setTitleValue(heroBoardData.title);
			setSubtitleValue(heroBoardData.subtitle);
			setGradient(heroBoardData.imageGradient);
			setSubtitleColor(heroBoardData.subtitleColor);
			setTitleColor(heroBoardData.titleColor);
			reset({
				image: heroBoardData.image,
				imageGradient: heroBoardData.imageGradient,
				title: heroBoardData.title,
				titleColor: heroBoardData.titleColor,
				subtitle: heroBoardData.subtitle,
				subtitleColor: heroBoardData.subtitleColor,
			});
			setIsTabsClickBlocked(false);
		}
	};

	const handleOnModalRemoveYesClick = async () => {
		if (query?.id) {
			await deleteHeroBoardById(query?.id.toString());
			await getTabsData(fetchHeroData);
		}
	};

	return (
		<>
			{(isLoading || !heroBoardData) && query?.id !== 'empty' && <Loader />}
			{!isLoading && query?.id && query?.id === 'empty' && <EmptyBoard />}
			{!isLoading && query?.id !== 'empty' && heroBoardData && (
				<form onSubmit={handleSubmit(onSubmit)} className={s.form}>
					<ImgUploadTextOverlaid
						gradientValue={gradient}
						titleColor={titleColor}
						subtitleColor={subtitleColor}
						titleValue={titleValue}
						subtitleValue={subtitleValue}
						register={registers.image}
						watch={watch}
						errors={errors}
					/>
					<ColorRadioBlock
						block="imageGradient"
						register={registers.imageGradient}
						watch={watch}
					/>
					<TextArea
						rows={2}
						register={registers.title}
						required
						label="Заголовок"
						placeholder=""
						maxLength={90}
						errors={errors}
						showInfo
					/>
					<ColorRadioBlock block="titleColor" register={registers.titleColor} watch={watch} />
					<TextInputWithCounter
						register={registers.subtitle}
						required
						label="Підзаголовок"
						placeholder=""
						maxLength={40}
						errors={errors}
						showInfo
					/>
					<ColorRadioBlock
						block="subtitleColor"
						register={registers.subtitleColor}
						watch={watch}
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
				</form>
			)}
		</>
	);
}
