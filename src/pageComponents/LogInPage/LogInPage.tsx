import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

import { api } from '~api/index';
import { Button } from '~components/Buttons/Button';
import { Container } from '~components/Container/Container';
import { TextInput } from '~components/inputs/TextInput/TextInput';
import { LoaderOverlay } from '~components/LoaderOverlay/LoaderOverlay';
import { Modal } from '~components/Modal/Modal';
import { Section } from '~components/Section/Section';
import { Text } from '~components/Text/Text';
import { ROUTES } from '~constants/ROUTES';

import s from './LogInPage.module.scss';

export interface FormFields {
	login: string;
	password: string;
}

export function LogInPage() {
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [isModalErrorOpen, setIsModalErrorOpen] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormFields>({
		mode: 'onSubmit',
	});

	const registers = {
		login: register('login', {
			required: 'Поле не може бути пустим',
		}),
		password: register('password', {
			required: 'Поле не може бути пустим',
		}),
	};

	const router = useRouter();

	const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
		setIsLoading(true);

		const res = await api.auth.authAdmin({ username: data.login, password: data.password });
		if ('data' in res) {
			Cookies.set('token', res.data.token, { secure: true, expires: 1 });
			router.push(ROUTES.admin);
		} else {
			setErrorMessage('Помилка авторизації. Перевірте, будь ласка, дані та спробуйте ще раз!');
			setIsModalErrorOpen(true);
			setIsLoading(false);
		}
	};

	const handleErrorModalOnClose = () => {
		setErrorMessage('');
		setIsModalErrorOpen(false);
	};

	return (
		<>
			<Section className={s.LogInPage}>
				<Container className={s.container}>
					<form className={s.formFields} onSubmit={handleSubmit(onSubmit)}>
						<Text variant="h2" className={s.title}>
							Вхід
						</Text>
						<TextInput
							type="text"
							register={registers.login}
							required
							errors={errors}
							label="Логін"
							placeholder="Логін"
							className={s.input}
						/>
						<TextInput
							type="password"
							register={registers.password}
							required
							errors={errors}
							label="Пароль"
							placeholder="Пароль"
							className={s.input}
						/>
						<Button submit>Увійти</Button>
					</form>
				</Container>
			</Section>
			{isLoading && <LoaderOverlay />}
			{errorMessage && (
				<Modal isOpen={isModalErrorOpen} onClose={handleErrorModalOnClose}>
					{errorMessage}
				</Modal>
			)}
		</>
	);
}
