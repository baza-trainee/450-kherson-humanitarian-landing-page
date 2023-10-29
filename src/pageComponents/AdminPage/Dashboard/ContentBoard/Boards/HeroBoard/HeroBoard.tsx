import { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import imageCompression from 'browser-image-compression';

import { useHeroesState } from '~/pageComponents/AdminPage/store/useHeroesState';
import { useTabsState } from '~/pageComponents/AdminPage/store/useTabsState';
import AdminBoardBlockButtons from '~components/Buttons/AdminBoardBlockButtons/AdminBoardBlockButtons';
import { ColorRadioBlock } from '~components/ColorRadio/ColorRadioBlock';
import { ImgUploadTextOverlaid } from '~components/ImgUploadTextOverlaid/ImgUploadTextOverlaid';
import { TextInput } from '~components/inputs/TextInput/TextInput';
// import { TextInputWithCounter } from '~components/inputs/TextInput/TextInputWithCounter';
import { Loader } from '~components/Loader/Loader';
import { ModalPop } from '~components/ModalPop/ModalPop';

// import { getErrorMessageFromCode } from '~helpers/getErrorMessageFromCode';
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
	const [gradient, setGradient] = useState<string>('');
	const [titleColor, setTitleColor] = useState<string>('');
	const [subtitleColor, setSubtitleColor] = useState<string>('');
	const [titleValue, setTitleValue] = useState<string>('');
	const [subtitleValue, setSubtitleValue] = useState<string>('');
	const [errorMessage, setErrorMessage] = useState('');
	const [isModalErrorOpen, setIsModalErrorOpen] = useState(false);
	const [titleLength, setTitleLength] = useState<number>(0);
	const [subtitleLength, setSubtitleLength] = useState<number>(0);

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
	} = useHeroesState((state) => ({
		isLoading: state.isLoading,
		heroBoardData: state.heroBoardData,
		getHeroBoardById: state.getHeroBoardById,
		changeHeroBoard: state.changeHeroBoard,
		addNewHeroBoard: state.addNewHeroBoard,
		deleteHeroBoard: state.deleteHeroBoard,
	}));

	useEffect(() => {
		const fetchData = async () => {
			if (activeTabId) await getHeroBoardById(activeTabId);
		};
		if (activeTabId) fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeTabId]);

	const {
		register,
		handleSubmit,
		// formState: { errors },
		setValue,
		watch,
	} = useForm<FormFields>({
		mode: 'onChange',
		defaultValues: {
			image: '',
			imageGradient: '',
			title: '',
			titleColor: '',
			subtitle: '',
			subtitleColor: '',
		},
	});

	useEffect(() => {
		if (heroBoardData) {
			setValue('image', heroBoardData?.view.picture.image);
			setValue('imageGradient', heroBoardData.view.color);
			setValue('title', heroBoardData.title.text);
			setValue('titleColor', heroBoardData.title.color);
			setValue('subtitle', heroBoardData.subtitle.text);
			setValue('subtitleColor', heroBoardData.subtitle.color);
			setTitleValue(heroBoardData.title.text);
			setSubtitleValue(heroBoardData.subtitle.text);
			setTitleLength(heroBoardData.title.text.length);
			setSubtitleLength(heroBoardData.subtitle.text.length);
			setGradient(heroBoardData.view.color);
			setSubtitleColor(heroBoardData.subtitle.color);
			setTitleColor(heroBoardData.title.color);
		}
		if (!activeTabId) {
			setValue('image', '');
			setValue('imageGradient', '');
			setValue('title', '');
			setValue('titleColor', '');
			setValue('subtitle', '');
			setValue('subtitleColor', '');
			setTitleValue('');
			setSubtitleValue('');
			setTitleLength(0);
			setSubtitleLength(0);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [heroBoardData, activeTabId]);

	if (!heroBoardData) return;

	const registers = {
		image: register('image'),
		imageGradient: register('imageGradient'),
		title: register('title'),
		titleColor: register('titleColor'),
		subtitle: register('subtitle'),
		subtitleColor: register('subtitleColor'),
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
			}
		} catch (error) {
			console.error('Error:', error);
		}

		const body = {
			id: activeTabId ? activeTabId : '',
			view:
				data.image === heroBoardData.view.picture.image && !image
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

		console.log('body', body);
		activeTabId ? await changeHeroBoard(body) : await addNewHeroBoard(body);
	};

	const handleErrorModalOnClose = () => {
		setErrorMessage('');
		setIsModalErrorOpen(false);
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
		setTitleLength(event.target.value.length);
	};

	const changeSubtitle = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSubtitleValue(event.target.value);
		setSubtitleLength(event.target.value.length);
	};

	const handleUndoChanges = () => {
		console.log('handleUndoChanges');
	};

	const handleDelete = async () => {
		if (activeTabId) {
			await deleteHeroBoard(activeTabId);
			await getTabsData(fetchHeroData);
		}
	};

	return (
		<>
			{(isLoading || !heroBoardData) && <Loader />}
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
					/>
					<ColorRadioBlock
						block="imageGradient"
						changeRadio={changeRadio}
						register={registers.imageGradient}
						value={gradient}
						watch={watch}
					/>
					<TextInput
						register={registers.title}
						required
						label="Заголовок"
						placeholder=""
						info={`Символів ${titleLength}/90`}
						onChange={changeTitle}
						maxLength={90}
					/>
					<ColorRadioBlock
						block="titleColor"
						changeRadio={changeRadio}
						register={registers.titleColor}
						value={titleColor}
						watch={watch}
					/>
					<TextInput
						register={registers.subtitle}
						required
						label="Підзаголовок"
						placeholder=""
						info={`Символів ${subtitleLength}/40`}
						onChange={changeSubtitle}
						maxLength={40}
					/>
					<ColorRadioBlock
						block="subtitleColor"
						changeRadio={changeRadio}
						register={registers.subtitleColor}
						value={subtitleColor}
						watch={watch}
					/>
					<AdminBoardBlockButtons
						submit
						handleUndoChanges={handleUndoChanges}
						handleDelete={handleDelete}
					/>
				</form>
			)}
			{errorMessage && (
				<ModalPop
					type="error"
					title="Помилка при створенні!"
					isOpen={isModalErrorOpen}
					onClose={handleErrorModalOnClose}
				>
					{errorMessage}
				</ModalPop>
			)}
		</>
	);
}
