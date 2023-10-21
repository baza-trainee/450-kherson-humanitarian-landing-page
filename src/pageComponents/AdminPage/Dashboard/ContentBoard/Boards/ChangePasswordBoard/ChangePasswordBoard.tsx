import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/router';

import { apiAuth } from '~/apiAuth';
import { Button } from '~components/Buttons/Button';
import { PasswordInput } from '~components/inputs/PasswordInput/PasswordInput';
import { ModalPop } from '~components/ModalPop/ModalPop';
import { ROUTES } from '~constants/ROUTES';
import { getErrorMessageFromCode } from '~helpers/getErrorMessageFromCode';
import { useLoaderOverlay } from '~hooks/useLoaderOverlay';

import s from './ChangePasswordBoard.module.scss';

export interface FormFields {
	password: string;
}

export function ChangePasswordBoard() {
	const router = useRouter();

	const { LoaderOverlay, showLoaderOverlay, hideLoaderOverlay } = useLoaderOverlay();

	const [isChangedPassword, setIsChangedPassword] = useState(false);
	const handleSuccessModalOnClose = async () => {
		await apiAuth.logout();
		router.push(ROUTES.login);
		setIsChangedPassword(false);
	};

	const [errorMessage, setErrorMessage] = useState('');
	const handleErrorModalOnClose = () => {
		setErrorMessage('');
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormFields>({
		mode: 'onSubmit',
	});

	const registers = {
		password: register('password', {
			required: 'Поле не може бути пустим',
			minLength: { value: 8, message: 'Мінімальна кількість символів 8' },
			pattern: {
				value: /(?=.*[a-z])(?=.*[A-Z])/,
				message:
					'Поле повинно містити принаймні одну велику та одну малу літери латинського алфавіту',
			},
		}),
	};

	const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
		showLoaderOverlay();
		const resp = await apiAuth.change({ password: data.password });

		if ('data' in resp) {
			setIsChangedPassword(true);
		} else {
			const message = getErrorMessageFromCode(resp.status, {});
			setErrorMessage(message);
		}
		hideLoaderOverlay();
	};

	return (
		<>
			<form className={s.ChangePasswordBoard} onSubmit={handleSubmit(onSubmit)}>
				<PasswordInput
					register={registers.password}
					required
					errors={errors}
					label="Новий пароль"
					placeholder="w40n5v$wEPWu8j9w&"
					maxLength={20}
				/>
				<Button submit>Оновити пароль</Button>
			</form>
			<LoaderOverlay />
			{errorMessage && (
				<ModalPop
					type="error"
					title="Помилка при створенні списку!"
					isOpen={!!errorMessage}
					onClose={handleErrorModalOnClose}
				>
					{errorMessage}
				</ModalPop>
			)}
			{isChangedPassword && (
				<ModalPop
					title="Успіх!"
					isOpen={isChangedPassword}
					onClose={handleSuccessModalOnClose}
					leftButton={() => (
						<Button type="primary" onClick={handleSuccessModalOnClose}>
							А шо робить ¯\_(ツ)_/¯
						</Button>
					)}
				>
					Пароль змінено
				</ModalPop>
			)}
		</>
	);
}
