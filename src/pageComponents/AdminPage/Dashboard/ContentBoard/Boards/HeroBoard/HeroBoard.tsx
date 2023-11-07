import { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import imageCompression from 'browser-image-compression';

import AdminBoardBlockButtons from '~/pageComponents/AdminPage/components/ActionButtons/ActionButtons';
import { useHeroesState } from '~/pageComponents/AdminPage/store/useHeroesState';
import { useTabsState } from '~/pageComponents/AdminPage/store/useTabsState';
import { ColorRadioBlock } from '~components/ColorRadio/ColorRadioBlock';
import { ImgUploadTextOverlaid } from '~components/ImgUploadTextOverlaid/ImgUploadTextOverlaid';
import { TextInput } from '~components/inputs/TextInput/TextInput';
// import { TextInputWithCounter } from '~components/inputs/TextInput/TextInputWithCounter';
import { Loader } from '~components/Loader/Loader';

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
		isLoading,
		heroBoardData,
		getHeroBoardById,
		changeHeroBoard,
		addNewHeroBoard,
		deleteHeroBoard,
		addNewEmptyHeroBoard,
	} = useHeroesState((state) => ({
		isLoading: state.isLoading,
		heroBoardData: state.heroBoardData,
		getHeroBoardById: state.getHeroBoardById,
		changeHeroBoard: state.changeHeroBoard,
		addNewHeroBoard: state.addNewHeroBoard,
		deleteHeroBoard: state.deleteHeroBoard,
		addNewEmptyHeroBoard: state.addNewEmptyHeroBoard,
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
			required: 'Поле не може бути пустим',
		}),
		titleColor: register('titleColor', {
			required: true,
		}),
		subtitle: register('subtitle', {
			required: 'Поле не може бути пустим',
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

	const changeRadio = (value: string, name: string): void => {
		if (name === 'imageGradient') {
			setGradient(value);
		} else if (name === 'titleColor') {
			setTitleColor(value);
		} else if (name === 'subtitleColor') {
			setSubtitleColor(value);
		}
	};

	const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTitleValue(event.target.value);
	};

	const changeSubtitle = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSubtitleValue(event.target.value);
	};

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
			{!isLoading && activeTabId && activeTabId === 'empty' && <div>Порожнє</div>}
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
						changeRadio={changeRadio}
						register={registers.imageGradient}
						watch={watch}
					/>
					<TextInput
						register={registers.title}
						required
						label="Заголовок"
						placeholder=""
						info={`Символів ${titleValue.length}/90`}
						onChange={changeTitle}
						maxLength={90}
						errors={errors}
						hideError
					/>
					<ColorRadioBlock
						block="titleColor"
						changeRadio={changeRadio}
						register={registers.titleColor}
						watch={watch}
					/>
					<TextInput
						register={registers.subtitle}
						required
						label="Підзаголовок"
						placeholder=""
						info={`Символів ${subtitleValue.length}/40`}
						onChange={changeSubtitle}
						maxLength={40}
						errors={errors}
						hideError
					/>
					<ColorRadioBlock
						block="subtitleColor"
						changeRadio={changeRadio}
						register={registers.subtitleColor}
						watch={watch}
					/>
					<AdminBoardBlockButtons
						onRemove={activeTabId !== 'new' ? handleOnModalRemoveYesClick : undefined}
						onReset={handleOnModalCancelYesClick}
						onSave={handleSubmit(onSubmit)}
						isDataValid={isValid}
					/>
				</form>
			)}
		</>
	);
}
