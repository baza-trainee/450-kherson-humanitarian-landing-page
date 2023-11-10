import { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import imageCompression from 'browser-image-compression';

import ActionButtons from '~/pageComponents/AdminPage/components/ActionButtons/ActionButtons';
import { useHeroesState } from '~/pageComponents/AdminPage/store/useHeroesState';
import { useTabsState } from '~/pageComponents/AdminPage/store/useTabsState';
import { Button } from '~components/Buttons/Button';
import { ColorRadioBlock } from '~components/ColorRadio/ColorRadioBlock';
import { ImgUploadTextOverlaid } from '~components/ImgUploadTextOverlaid/ImgUploadTextOverlaid';
import { TextInputWithCounter } from '~components/inputs/TextInput/TextInputWithCounter';
import { Loader } from '~components/Loader/Loader';
import { ModalPop } from '~components/ModalPop/ModalPop';

import { fetchHeroData } from '../../../Tabs/fetchHelpers/fetchHeroData';

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

	const { activeTabId, getTabsData } = useTabsState((state) => ({
		activeTabId: state.activeTabId,
		getTabsData: state.getTabsData,
	}));

	const {
		isSuccess,
		isLoading,
		heroBoardData,
		getHeroBoardById,
		changeHeroBoard,
		addNewHeroBoard,
		deleteHeroBoard,
		addNewEmptyHeroBoard,
		setIsSuccess,
	} = useHeroesState((state) => ({
		isSuccess: state.isSuccess,
		isLoading: state.isLoading,
		heroBoardData: state.heroBoardData,
		getHeroBoardById: state.getHeroBoardById,
		changeHeroBoard: state.changeHeroBoard,
		addNewHeroBoard: state.addNewHeroBoard,
		deleteHeroBoard: state.deleteHeroBoard,
		addNewEmptyHeroBoard: state.addNewEmptyHeroBoard,
		setIsSuccess: state.setIsSuccess,
	}));

	useEffect(() => {
		const fetchData = async () => {
			if (activeTabId) await getHeroBoardById(activeTabId);
		};
		if (activeTabId !== 'new' && activeTabId !== 'empty') fetchData();
		else addNewEmptyHeroBoard();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeTabId]);

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
		}
		if (activeTabId === 'new') {
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
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [heroBoardData, activeTabId]);

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
			id: activeTabId && activeTabId !== 'new' ? activeTabId : '',
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
				text: data.title,
				color: data.titleColor,
			},
			subtitle: {
				text: data.subtitle,
				color: data.subtitleColor,
			},
		};
		activeTabId === 'new' ? await addNewHeroBoard(body) : await changeHeroBoard(body);
	};
	useEffect(() => {
		watch((value) => {
			if (value.imageGradient) setGradient(value.imageGradient);
			if (value.title) setTitleValue(value.title);
			if (value.titleColor) setTitleColor(value.titleColor);
			if (value.subtitle) setSubtitleValue(value.subtitle);
			if (value.subtitleColor) setSubtitleColor(value.subtitleColor);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watch, heroBoardData]);

	const handleOnModalCancelYesClick = () => {
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
		}
	};

	const handleOnModalRemoveYesClick = async () => {
		if (activeTabId) {
			await deleteHeroBoard(activeTabId);
			await getTabsData(fetchHeroData);
		}
	};
	//TODO: empty?
	return (
		<>
			{(isLoading || !heroBoardData) && activeTabId !== 'empty' && <Loader />}
			{
				!isLoading && activeTabId && activeTabId === 'empty' && <div>Порожнє</div>
				//TODO: empty div
			}
			{!isLoading && (
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
					<TextInputWithCounter
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
						onRemove={activeTabId !== 'new' ? handleOnModalRemoveYesClick : undefined}
						onReset={handleOnModalCancelYesClick}
						onSave={handleSubmit(onSubmit)}
						isDataValid={isValid}
					/>
					{isSuccess && (
						<ModalPop
							isOpen={isSuccess}
							onClose={setIsSuccess}
							title="Вітаємо!"
							leftButton={() => <Button onClick={setIsSuccess}>Ок</Button>}
						>
							Ваші дані успішно збережено
						</ModalPop>
					)}
				</form>
			)}
		</>
	);
}
