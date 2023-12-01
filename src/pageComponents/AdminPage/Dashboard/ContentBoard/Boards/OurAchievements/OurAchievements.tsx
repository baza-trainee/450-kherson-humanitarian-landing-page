import { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import ActionButtons from '~/pageComponents/AdminPage/components/ActionButtons/ActionButtons';
import { useOurAchievementsBoardState } from '~/pageComponents/AdminPage/store/useOurAchievementsBoardState';
import { useTabsState } from '~/pageComponents/AdminPage/store/useTabsState';
import { Button } from '~components/Buttons/Button';
import { TextInputWithCounter } from '~components/inputs/TextInput/TextInputWithCounter';
import { Loader } from '~components/Loader/Loader';
import { ModalPop } from '~components/ModalPop/ModalPop';

import s from './ourAchievements.module.scss';

export interface FormFields {
	issuedSets: string;
	receivedHelp: string;
	donations: string;
	issueDate: string;
}
export function OurAchievements() {
	const { isTabsClickBlocked, setIsTabsClickBlocked } = useTabsState((state) => ({
		isTabsClickBlocked: state.isTabsClickBlocked,
		setIsTabsClickBlocked: state.setIsTabsClickBlocked,
	}));
	const {
		ourAchievementsBoardData,
		getBoardData,
		isLoading,
		isModalOnSuccessSaveOpen,
		setIsModalOnSuccessSaveClose,
		updateOurAchievementsDataBoard,
		stateError,
	} = useOurAchievementsBoardState((state) => ({
		stateError: state.error,
		isLoading: state.isLoading,
		updateOurAchievementsDataBoard: state.updateOurAchievementsDataBoard,
		isModalOnSuccessSaveOpen: state.isModalOnSuccessSaveOpen,
		setIsModalOnSuccessSaveClose: state.setIsModalOnSuccessSaveClose,
		ourAchievementsBoardData: state.ourAchievementsBoardData,
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
	const currentFormattedDate = () => {
		return ourAchievementsBoardData
			? ourAchievementsBoardData.issueDate
					.split('.')
					.reverse()
					.map((part) => part.padStart(2, '0'))
					.join('-')
			: '';
	};

	useEffect(() => {
		if (ourAchievementsBoardData) {
			const isoDate = currentFormattedDate();

			setValue('issuedSets', ourAchievementsBoardData.issuedSets);
			setValue('receivedHelp', ourAchievementsBoardData.receivedHelp);
			setValue('donations', ourAchievementsBoardData.donations);
			setValue('issueDate', isoDate);
		}
		setErrorMessage('');
		clearErrors();
		setIsTabsClickBlocked(false);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ourAchievementsBoardData]);

	const registers = {
		issuedSets: register('issuedSets', {
			required: 'Поле не може бути пустим',
			min: { value: 1, message: 'щось тут не так' },
			max: { value: 9999999999, message: 'щось тут не так' },
			pattern: { value: /^\d+$/, message: 'Введіть тільки цифри' },
		}),
		receivedHelp: register('receivedHelp', {
			required: 'Поле не може бути пустим',
			min: { value: 1, message: 'щось тут не так' },
			max: { value: 9999999999, message: 'щось тут не так' },
			pattern: { value: /^\d+$/, message: 'Введіть тільки цифри' },
		}),
		donations: register('donations', {
			required: 'Поле не може бути пустим',
			min: { value: 1, message: 'щось тут не так' },
			max: { value: 9999999999, message: 'щось тут не так' },
			pattern: { value: /^\d+$/, message: 'Введіть тільки цифри' },
		}),
		issueDate: register('issueDate', {
			required: 'Поле не може бути пустим',
			min: { value: '01.08.2022', message: 'щось тут не так' },
			max: { value: `${new Date()}`, message: 'щось тут не так' },
		}),
	};

	const handleUndoChanges = () => {
		const isoDate = currentFormattedDate();
		reset({
			issuedSets: ourAchievementsBoardData?.issuedSets,
			receivedHelp: ourAchievementsBoardData?.receivedHelp,
			donations: ourAchievementsBoardData?.donations,
			issueDate: isoDate,
		});
	};
	useEffect(() => {
		const isoDate = currentFormattedDate();
		watch((value) => {
			if (
				value.issuedSets !== ourAchievementsBoardData?.issuedSets ||
				value.receivedHelp !== ourAchievementsBoardData?.receivedHelp ||
				value.donations !== ourAchievementsBoardData?.donations ||
				value.issueDate !== isoDate
			) {
				setIsTabsClickBlocked(true);
			} else setIsTabsClickBlocked(false);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watch, ourAchievementsBoardData]);
	useEffect(() => {
		//*set message to show in Modal Error
		if (stateError) {
			if (stateError.status === 406)
				setErrorMessage('Не правильно введені дані. Можливо є зайві символи');
			if (stateError.status === 500) setErrorMessage(stateError.message);
		}
	}, [stateError]);

	const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
		const date = new Date(data.issueDate);
		const currentDate = new Date();
		date.setHours(
			currentDate.getHours(),
			currentDate.getMinutes(),
			currentDate.getSeconds(),
			currentDate.getMilliseconds(),
		);
		const formattedDate = date.toISOString();
		const body = {
			issuedHumanitarianKits: Number(data.issuedSets),
			receivedHumanitarianAid: Number(data.receivedHelp),
			sumDonats: Number(data.donations),

			infoAtDate: formattedDate,
		};

		if (data) {
			await updateOurAchievementsDataBoard(body);
		}
		setIsTabsClickBlocked(false);
	};
	return (
		<>
			{(isLoading || !ourAchievementsBoardData) && <Loader />}
			{!isLoading && ourAchievementsBoardData && (
				<form className={s.form}>
					<TextInputWithCounter
						type="text"
						register={registers.issuedSets}
						required
						errors={errors}
						label="Було видано гуманітарних наборів"
						placeholder="200"
						maxLength={12}
						showInfo
					/>
					<TextInputWithCounter
						type="text"
						register={registers.receivedHelp}
						required
						errors={errors}
						label="Було отримано гуманітарної допомоги"
						placeholder="200"
						maxLength={12}
						showInfo
					/>
					<TextInputWithCounter
						type="text"
						register={registers.donations}
						required
						errors={errors}
						label="Нам задонатили"
						placeholder="200"
						maxLength={12}
						showInfo
					/>
					<TextInputWithCounter
						type="date"
						register={registers.issueDate}
						required
						errors={errors}
						label="Інформація подана станом на"
						placeholder="24.08.2091"
						maxLength={10}
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
							title="Помилка при збереженні!"
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
