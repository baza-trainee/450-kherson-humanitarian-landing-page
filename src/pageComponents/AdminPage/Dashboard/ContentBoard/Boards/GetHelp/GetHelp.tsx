import { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import ActionButtons from '~/pageComponents/AdminPage/components/ActionButtons/ActionButtons';
import { useGetHelpState } from '~/pageComponents/AdminPage/store/useGetHelpState';
import { useTabsState } from '~/pageComponents/AdminPage/store/useTabsState';
import { Button } from '~components/Buttons/Button';
import { TextArea } from '~components/inputs/TextArea/TextArea';
import { TextInputWithCounter } from '~components/inputs/TextInput/TextInputWithCounter';
import { Loader } from '~components/Loader/Loader';
import { ModalPop } from '~components/ModalPop/ModalPop';
import { getErrorMessageFromCode } from '~helpers/getErrorMessageFromCode';

import s from './GetHelp.module.scss';

export interface FormFields {
	address: string;
	mapUrl: string;
}

export function GetHelp() {
	const { isTabsClickBlocked, setIsTabsClickBlocked } = useTabsState((state) => ({
		isTabsClickBlocked: state.isTabsClickBlocked,
		setIsTabsClickBlocked: state.setIsTabsClickBlocked,
	}));

	const {
		getHelpData,
		getBoardData,
		isLoading,
		isModalOnSuccessSaveOpen,
		setIsModalOnSuccessSaveClose,
		updateGetHelp,
		stateError,
	} = useGetHelpState((state) => ({
		stateError: state.error,
		isLoading: state.isLoading,
		updateGetHelp: state.updateGetHelp,
		isModalOnSuccessSaveOpen: state.isModalOnSuccessSaveOpen,
		setIsModalOnSuccessSaveClose: state.setIsModalOnSuccessSaveClose,
		getHelpData: state.getHelpData,
		getBoardData: state.getBoardData,
	}));

	useEffect(() => {
		getBoardData();
	}, [getBoardData]);

	const {
		register,
		setValue,
		handleSubmit,
		reset,
		watch,
		clearErrors,
		formState: { errors, isValid },
	} = useForm<FormFields>({
		mode: 'onSubmit',
	});

	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		if (getHelpData) {
			setValue('address', getHelpData.address);
			setValue('mapUrl', getHelpData.mapUrl);
		}
		setErrorMessage('');
		clearErrors();
		setIsTabsClickBlocked(false);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getHelpData]);

	const registers = {
		address: register('address', {
			required: 'Поле не може бути пустим',
			min: { value: 1, message: 'щось тут не так' },
			max: { value: 9999999999, message: 'щось тут не так' },
		}),
		mapUrl: register('mapUrl', {
			required: 'Поле не може бути пустим',
			min: { value: 1, message: 'щось тут не так' },
			max: { value: 9999999999, message: 'щось тут не так' },
		}),
	};

	const handleUndoChanges = () => {
		reset({
			address: getHelpData?.address,
			mapUrl: getHelpData?.mapUrl,
		});
	};

	useEffect(() => {
		watch((value) => {
			if (
				value.address !== getHelpData?.address ||
				value.mapUrl !== getHelpData?.mapUrl
	         ) {
				setIsTabsClickBlocked(true);
			} else setIsTabsClickBlocked(false);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watch, getHelpData]);

	useEffect(() => {
		//*set message to show in Modal Error
		if (stateError) {
			const message = getErrorMessageFromCode(stateError.status, {
				406: 'Помилка при збереженні. Не правильно введені дані. Можливо є зайві символи',
			});
			setErrorMessage(message);
		}
	}, [stateError]);
	const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
		const body = {
			geolocation: data.mapUrl,
			locationDeliveryPoint: data.address,
		};

		if (data) {
			await updateGetHelp(body);
		}
		setIsTabsClickBlocked(false);
	};

	return (
		<>
			{(isLoading || !getHelpData) && <Loader />}
			{!isLoading && getHelpData && (
				<form className={s.form}>
					<TextInputWithCounter
						type="text"
						register={registers.address}
						required
						errors={errors}
						label="Місцезнаходження пункту видачі гуманітарної допомоги:"
						placeholder="Введіть адресу"
						maxLength={78}
						showInfo
					/>
					<TextArea
						rows={15}
						register={registers.mapUrl}
						required
						label="карта"
						placeholder=""
						maxLength={900}
						errors={errors}
						showInfo
					/>
					<ActionButtons
						onSave={handleSubmit(onSubmit)}
						onReset={handleUndoChanges}
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
							title="Виникла помилка!"
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
