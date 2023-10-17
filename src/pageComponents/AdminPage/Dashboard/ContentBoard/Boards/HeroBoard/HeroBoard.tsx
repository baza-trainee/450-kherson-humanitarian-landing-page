import { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { useHeroesState } from '~/pageComponents/AdminPage/store/useHeroesState';
import { useTabsState } from '~/pageComponents/AdminPage/store/useTabsState';
import { api } from '~api/index';
// import { getHeroBanners } from '~api/rest/hero/hero';
// import type { Hero } from '~api/types/hero/Hero';
import { Button } from '~components/Buttons/Button';
import { ColorRadioBlock } from '~components/ColorRadio/ColorRadioBlock';
import { ImgUploadWrapper } from '~components/ImgUploadWrapper/ImgUploadWrapper';
import { TextInput } from '~components/inputs/TextInput/TextInput';
import { Loader } from '~components/Loader/Loader';
import { ModalPop } from '~components/ModalPop/ModalPop';
import { getErrorMessageFromCode } from '~helpers/getErrorMessageFromCode';

import s from './HeroBoard.module.scss';

interface FormFields {
	img: FileList | string;
	imgGradient: string;
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

	const { activeTabId } = useTabsState((state) => ({
		activeTabId: state.activeTabId,
	}));

	const { isLoading, error, heroBoardData, getHeroBoardById } = useHeroesState((state) => ({
		isLoading: state.isLoading,
		error: state.error,
		heroBoardData: state.heroBoardData,
		getHeroBoardById: state.getHeroBoardById,
	}));

	useEffect(() => {
		const fetchData = async () => {
			if (activeTabId) await getHeroBoardById(activeTabId);
		};
		if (activeTabId) fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeTabId]);
	// console.log('heroBoardData', heroBoardData); //------------------------log
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<FormFields>({
		mode: 'onChange',
		defaultValues: {
			img: '',
			imgGradient: '',
			title: '',
			titleColor: '',
			subtitle: '',
			subtitleColor: '',
		},
	});

	useEffect(() => {
		if (heroBoardData) {
			setValue('img', heroBoardData?.view.picture.image);
			setValue('imgGradient', heroBoardData.view.color);
			setValue('title', heroBoardData.title.text);
			setValue('titleColor', heroBoardData.title.color);
			setValue('subtitle', heroBoardData.subtitle.text);
			setValue('subtitleColor', heroBoardData.subtitle.color);
			// console.log('heroBoardData', heroBoardData);
			setTitleValue(heroBoardData.title.text);
			setSubtitleValue(heroBoardData.subtitle.text);
			setTitleLength(heroBoardData.title.text.length);
			setSubtitleLength(heroBoardData.subtitle.text.length);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [heroBoardData]);

	if (!heroBoardData) return;

	const registers = {
		img: register('img'),
		imgGradient: register('imgGradient'),
		title: register('title'),
		titleColor: register('titleColor'),
		subtitle: register('subtitle'),
		subtitleColor: register('subtitleColor'),
	};

	const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
		console.log('form data', data);
		const url = typeof data.img[0] === 'string' ? '' : URL.createObjectURL(data.img[0]);
		const type = typeof data.img[0] === 'string' ? '' : data.img[0].type;

		const body = {
			view: {
				// picture: {
				// 	mime_type: type,
				// 	image: url,
				// },
				color: data.imgGradient,
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
		// const resp = await api.hero.addNewHeroBoard(body);

		// if ('data' in resp && activeTabId) {
		// 	await getHeroBoardById(activeTabId);
		// } else {
		// 	const message = getErrorMessageFromCode(resp.status, {
		// 		400: 'Дата не може бути в минулому або список з такою датою вже існує!',
		// 		403: 'Користувач не авторизований!',
		// 		406: 'Недопустима кількість наборів! Поставте цифру менше та спробуйте ще раз',
		// 	});
		// 	setErrorMessage(message);
		// }
	};

	const handleErrorModalOnClose = () => {
		setErrorMessage('');
		setIsModalErrorOpen(false);
	};

	const changeRadio = (value: string, name: string): void => {
		console.log('changeRadio');
		if (name === 'imgGradient') {
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

	return (
		<>
			{(isLoading || !heroBoardData) && <Loader />}
			{!isLoading && heroBoardData && (
				<form onSubmit={handleSubmit(onSubmit)} className={s.form}>
					<ImgUploadWrapper
						gradientValue={gradient}
						titleColor={titleColor}
						subtitleColor={subtitleColor}
						titleValue={titleValue}
						subtitleValue={subtitleValue}
						register={registers.img}
					/>
					<ColorRadioBlock
						block="imgGradient"
						changeRadio={changeRadio}
						register={registers.imgGradient}
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
					/>
					<div className={s.buttonsBlock}>
						<Button type="secondary" className={s.btn}>
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
