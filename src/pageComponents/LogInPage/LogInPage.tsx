import { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/router';

import { Button } from '~components/Buttons/Button';
import { Container } from '~components/Container/Container';
import { PasswordInput } from '~components/inputs/PasswordInput/PasswordInput';
import { TextInput } from '~components/inputs/TextInput/TextInput';
import { CustomLink } from '~components/Link/Link';
import { ModalPop } from '~components/ModalPop/ModalPop';
import { Section } from '~components/Section/Section';
import { Text } from '~components/Text/Text';
import { ROUTES } from '~constants/ROUTES';
import { getErrorMessageFromCode } from '~helpers/getErrorMessageFromCode';
import { useLoaderOverlay } from '~hooks/useLoaderOverlay';

import { useLoginState } from './store/useLoginState';

import s from './LogInPage.module.scss';

export interface FormFields {
	login: string;
	password: string;
}

export function LogInPage() {
	const [errorMessage, setErrorMessage] = useState('');

	const { error, isLogin, login } = useLoginState((state) => ({
		isLoading: state.isLoading,
		error: state.error,
		isLogin: state.isLogin,
		login: state.login,
	}));

	const { LoaderOverlay, showLoaderOverlay, hideLoaderOverlay } = useLoaderOverlay();

	const router = useRouter();

	useEffect(() => {
		if (isLogin) router.push(ROUTES.adminHome);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLogin]);

	useEffect(() => {
		if (error) {
			const message = getErrorMessageFromCode(error?.status, {
				403: 'Неправильний логін та/або пароль!',
				500: 'Помилка на сервері. Спробуйте пізніше!',
			});
			setErrorMessage(message);
			hideLoaderOverlay();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [error]);

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

	const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
		showLoaderOverlay();
		await login(data.login, data.password);
	};

	const handleErrorModalOnClose = () => {
		setErrorMessage('');
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
						<PasswordInput
							register={registers.password}
							required
							errors={errors}
							label="Пароль"
							placeholder="Пароль"
							className={s.input}
						/>
						<CustomLink className={s.link} variant={'h4'} href={ROUTES.recoverPassword}>
							Забули пароль?
						</CustomLink>
						<Button submit>Увійти</Button>
					</form>
				</Container>
			</Section>
			<ModalPop
				type="error"
				title="Помилка авторизації"
				isOpen={!!errorMessage}
				onClose={handleErrorModalOnClose}
			>
				{errorMessage}
			</ModalPop>
			<LoaderOverlay />
		</>
	);
}
