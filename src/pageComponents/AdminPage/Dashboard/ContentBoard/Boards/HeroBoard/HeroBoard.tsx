import { useState } from 'react';
import type { SubmitHandler} from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { Button } from '~components/Buttons/Button';
// import { api } from '~api/index';
import { ColorRadioBlock } from '~components/ColorRadio/ColorRadioBlock';
import { ImgUploadWrapper } from '~components/ImgUploadWrapper/ImgUploadWrapper';
import { TextInput } from '~components/inputs/TextInput/TextInput';
import { ModalPop } from '~components/ModalPop/ModalPop';

// import { getErrorMessageFromCode } from '~helpers/getErrorMessageFromCode';
import s from './HeroBoard.module.scss';

export interface FormFields {
	img: FileList;
	gradient: string;
	title: string;
	titleColor: string;
	subtitle: string;
	subtitleColor: string;
}
export function HeroBoard(){
	const [gradient, setGradient] = useState<string>('noGradient');
	const [titleColor, setTitleColor] = useState<string>('black');
	const [subtitleColor, setSubtitleColor] = useState<string>('black');
	const [titleValue, setTitleValue] = useState<string>('Відбудовуємо зруйновані та пошкоджені об’єкти (Херсонська область)');
	const [subtitleValue, setSubtitleValue] = useState<string>('м. Кривий Ріг');
	const [errorMessage, setErrorMessage] = useState('');
	const [isModalErrorOpen, setIsModalErrorOpen] = useState(false);

	const changeRadio = (value: string, name: string): void => {
		if (name==='imgGradient'){
			setGradient(value);
		} else
		if (name==='titleColor'){
			setTitleColor(value);
		} else if (name==='subtitleColor'){
			setSubtitleColor(value);
		}
	};
	const {
		register,
		handleSubmit,
	} = useForm<FormFields>({
		mode: 'onChange',
	});
	const registers = {
		img: register('img'),
		gradient: register('gradient'),
		title: register('title', {
			max: { value: 90, message: '' },
		}),
		titleColor: register('titleColor'),
		subtitle: register('subtitle', {
			max: { value: 40, message: '' },
		}),
		subtitleColor: register('subtitleColor'),
	};
	const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
		// const body = {

		// };
		// const resp = await api.lists.addNewList(body);

		// if ('data' in resp) {
		// 	await getListsByCategory(category);
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
	const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTitleValue(event.target.value);
	};
	const changeSubtitle = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSubtitleValue(event.target.value);
	};

	return(
		<>
		<form onSubmit={handleSubmit(onSubmit)} className={s.form}>
		<ImgUploadWrapper
			gradientValue={gradient}
			titleColor={titleColor}
			subtitleColor={subtitleColor}
			titleValue ={titleValue}
			subtitleValue={subtitleValue}
			register={registers.img}
		/>
		<ColorRadioBlock block='imgGradient' changeRadio={changeRadio} register={registers.gradient}/>
		<TextInput
			register={registers.title}
			required
			label="Заголовок"
			placeholder=""
			defaultValue="Відбудовуємо зруйновані та пошкоджені об’єкти (Херсонська область)"
			info='Символів 66/90'
			onChange={changeTitle}
		/>
		<ColorRadioBlock block='titleColor' changeRadio={changeRadio} register={registers.titleColor}/>
		<TextInput
			register={registers.subtitle}
			required
			label="Підзаголовок"
			placeholder=""
			defaultValue="м. Кривий Ріг"
			info='Символів 10/40'
			onChange={changeSubtitle}
		/>
		<ColorRadioBlock block='subtitleColor' changeRadio={changeRadio} register={registers.subtitleColor}/>
		<div className={s.buttonsBlock}>
			<Button type="secondary" className={s.btn}>Видалити блок</Button>
			<Button type="secondary" className={s.btn}>Скасувати зміни</Button>
			<Button type="primary" submit className={s.btn} >Зберегти</Button>
		</div>

		</form>
		{errorMessage && (
			<ModalPop
				type="error"
				title="Помилка при створенні списку!"
				isOpen={isModalErrorOpen}
				onClose={handleErrorModalOnClose}
			>
				{errorMessage}
			</ModalPop>
		)}
		</>

	);
}
