import { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { useHeroesState } from '~/pageComponents/AdminPage/store/useHeroesState';
import { useTabsState } from '~/pageComponents/AdminPage/store/useTabsState';
import { Button } from '~components/Buttons/Button';
import { ColorRadioBlock } from '~components/ColorRadio/ColorRadioBlock';
import { ImgUploadTextOverlaid } from '~components/ImgUploadTextOverlaid/ImgUploadTextOverlaid';
import { TextInput } from '~components/inputs/TextInput/TextInput';
// import { TextInputWithCounter } from '~components/inputs/TextInput/TextInputWithCounter';
import { Loader } from '~components/Loader/Loader';
import { ModalPop } from '~components/ModalPop/ModalPop';
import { getErrorMessageFromCode } from '~helpers/getErrorMessageFromCode';

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
		formState: { errors },
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
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [heroBoardData]);

	if (!heroBoardData) return;

	const registers = {
		image: register('image'),
		imageGradient: register('imageGradient'),
		title: register('title'),
		titleColor: register('titleColor'),
		subtitle: register('subtitle'),
		subtitleColor: register('subtitleColor'),
	};

	const convertToBase64 = async (file: File): Promise<string> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onloadend = () => {
				if (reader.result) {
					resolve(reader.result.toString());
				} else {
					reject(new Error('Failed to read file'));
				}
			};
			reader.readAsDataURL(file);
		});
	};

	const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
		let image, type, view;

		try {
			if (data.image.length > 0 && typeof data.image !== 'string') {
				image = await convertToBase64(data.image[0]);
				type = data.image[0].type;
				console.log('image', image);
				console.log('imageAfterCut', image.split(',')[1]);
			}
		} catch (error) {
			console.error('Error:', error);
		}

		if (data.image === heroBoardData.view.picture.image) view = { color: data.imageGradient };
		else
			view = {
				picture: {
					mime_type: type,
					image: image,
				},
				color: data.imageGradient,
			};

		const body = {
			id: activeTabId ? activeTabId : '',
			view: view,
			title: {
				text: data.title,
				color: data.titleColor,
			},
			subtitle: {
				text: data.subtitle,
				color: data.subtitleColor,
			},
		};

		console.log('form data', data);
		await changeHeroBoard(body);
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

	const handleDelete = async () => {
		if (activeTabId) {
			await deleteHeroBoard(activeTabId);
			await getTabsData(fetchHeroData);
		}
	};

	return (
		<>
			{(isLoading || !heroBoardData) && <Loader />}
			{!isLoading && activeTabId && heroBoardData && (
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
						block="imgGradient"
						changeRadio={changeRadio}
						register={registers.imageGradient}
						value={heroBoardData.view.color}
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
						value={heroBoardData.title.color}
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
						value={heroBoardData.subtitle.color}
						watch={watch}
					/>
					<div className={s.buttonsBlock}>
						<Button type="secondary" className={s.btn} onClick={handleDelete}>
							Видалити блок
						</Button>
						<Button type="secondary" className={s.btn}>
							Скасувати зміни
						</Button>
						<Button type="primary" submit className={s.btn}>
							Зберегти
						</Button>
					</div>
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
