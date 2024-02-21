import { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/router';

import ActionButtons from '~/pageComponents/AdminPage/components/ActionButtons/ActionButtons';
import { useDonationsState } from '~/pageComponents/AdminPage/store/useDonationsState';
import { useTabsState } from '~/pageComponents/AdminPage/store/useTabsState';
import { Button } from '~components/Buttons/Button';
import { TextInputWithCounter } from '~components/inputs/TextInput/TextInputWithCounter';
import { Loader } from '~components/Loader/Loader';
import { ModalPop } from '~components/ModalPop/ModalPop';
import { getErrorMessageFromCode } from '~helpers/getErrorMessageFromCode';

import { fetchDonationsData } from '../../../Tabs/fetchHelpers/fetchDonationsData';
import { EmptyBoard } from '../EmptyBoard/EmptyBoard';

import s from './DonationsBoard.module.scss';

interface FormFields {
	currency: string;
	recipient: string;
	IBAN: string;
	IPN: string;
	paymentPurpose: string;
}

export function DonationsBoard() {
	const router = useRouter();
	const { query } = router;

	const { isTabsClickBlocked, getTabsData, setIsTabsClickBlocked } = useTabsState((state) => ({
		isTabsClickBlocked: state.isTabsClickBlocked,
		getTabsData: state.getTabsData,
		setIsTabsClickBlocked: state.setIsTabsClickBlocked,
	}));

	const {
		isModalOnSuccessSaveOpen,
		isLoading,
		donationsBoardData,
		stateError,
		getDonationsBoardById,
		updateDonationsBoardById,
		addNewDonationsBoard,
		addNewEmptyDonationsBoard,
		deleteDonationsBoardById,
		setIsModalOnSuccessSaveClose,
	} = useDonationsState((state) => ({
		isModalOnSuccessSaveOpen: state.isModalOnSuccessSaveOpen,
		isLoading: state.isLoading,
		donationsBoardData: state.donationsBoardData,
		stateError: state.error,
		getDonationsBoardById: state.getDonationsBoardById,
		updateDonationsBoardById: state.updateDonationsBoardById,
		addNewDonationsBoard: state.addNewDonationsBoard,
		addNewEmptyDonationsBoard: state.addNewEmptyDonationsBoard,
		deleteDonationsBoardById: state.deleteDonationsBoardById,
		setIsModalOnSuccessSaveClose: state.setIsModalOnSuccessSaveClose,
	}));

	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			if (query?.id) await getDonationsBoardById(query?.id.toString());
		};
		//*set data from server into state
		if (query?.id !== 'new' && query?.id !== 'empty') fetchData();
		//* if new form, set empty state
		else addNewEmptyDonationsBoard();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query?.id]);

	useEffect(() => {
		//*set message to show in Modal Error
		if (stateError) {
			const message = getErrorMessageFromCode(stateError.status, {
				406: 'Помилка при збереженні. Не правильно введені дані. Можливо є зайві символи',
			});
			setErrorMessage(message);
		}
	}, [stateError]);

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		setValue,
		watch,
		reset,
		clearErrors,
	} = useForm<FormFields>({
		mode: 'onSubmit',
	});

	useEffect(() => {
		if (donationsBoardData) {
			//* set data from state into form to display
			setValue('IBAN', donationsBoardData.IBAN);
			setValue('IPN', donationsBoardData.IPN);
			setValue('currency', donationsBoardData.currency);
			setValue('paymentPurpose', donationsBoardData.paymentPurpose);
			setValue('recipient', donationsBoardData.recipient);
			clearErrors();
			setIsTabsClickBlocked(false); //*if new data from server, than not block tabs clicking
		}
		if (query?.id === 'new') {
			//* set empty or default values
			setValue('IBAN', '');
			setValue('IPN', '');
			setValue('currency', '');
			setValue('paymentPurpose', '');
			setValue('recipient', '');
			clearErrors();
			setIsTabsClickBlocked(false); //*if new empty board, than not block tabs clicking
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [donationsBoardData, query?.id]);

	const registers = {
		IBAN: register('IBAN', {
			required: true,
			pattern: {
				value: /^([A-Z]{2}[ -]?[0-9]{2})(?=(?:[ -]?[A-Z0-9]){9,30}$)((?:[ -]?[A-Z0-9]{3,5}){2,7})([ -]?[A-Z0-9]{1,3})?$/,
				message: 'Введіть правильне значення',
			},
		}),
		IPN: register('IPN', {
			required: true,
			pattern: {
				value: /^\d{8}(\d{2})?$/,
				message: 'Введіть правильне значення',
			},
		}),
		currency: register('currency', {
			required: true,
		}),
		paymentPurpose: register('paymentPurpose', {
			required: true,
		}),
		recipient: register('recipient', {
			required: true,
		}),
	};

	const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
		const body = {
			id: query?.id && query?.id !== 'new' ? query?.id.toString() : '',
			IBAN: data.IBAN,
			IPN: data.IPN,
			currency: data.currency,
			paymentPurpose: data.paymentPurpose,
			recipient: data.recipient,
		};
		query?.id === 'new' ? await addNewDonationsBoard(body) : await updateDonationsBoardById(body);
		// *after saving into server need to set IsBlocked to false in order to click between tabs
		setIsTabsClickBlocked(false);
		await getTabsData(fetchDonationsData);
	};

	useEffect(() => {
		watch((value) => {
			//* need to check if some changes at form, then set isBlocked to true, in order to block clicking between tabs
			if (
				value.IBAN !== donationsBoardData?.IBAN ||
				value.IPN !== donationsBoardData?.IPN ||
				value.currency !== donationsBoardData?.currency ||
				value.paymentPurpose !== donationsBoardData?.paymentPurpose ||
				value.recipient !== donationsBoardData?.recipient
			) {
				setIsTabsClickBlocked(true); //*if are changes, set block
			} else {
				setIsTabsClickBlocked(false);
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watch, donationsBoardData]);

	const handleOnModalCancelYesClick = async () => {
		if (donationsBoardData) {
			reset({
				IBAN: donationsBoardData.IBAN,
				IPN: donationsBoardData.IPN,
				currency: donationsBoardData.currency,
				paymentPurpose: donationsBoardData.paymentPurpose,
				recipient: donationsBoardData.recipient,
			});
			setIsTabsClickBlocked(false);
		}
	};

	const handleOnModalRemoveYesClick = async () => {
		if (query?.id) {
			await deleteDonationsBoardById(query?.id.toString());
			await getTabsData(fetchDonationsData);
		}
	};

	return (
		<>
			{(isLoading || !donationsBoardData) && query?.id !== 'empty' && <Loader />}
			{!isLoading && query?.id && query?.id === 'empty' && <EmptyBoard />}
			{!isLoading && query?.id !== 'empty' && donationsBoardData && (
				<form onSubmit={handleSubmit(onSubmit)} className={s.form}>
					<TextInputWithCounter
						register={registers.currency}
						required
						label="Валюта"
						placeholder=""
						maxLength={10}
						errors={errors}
						showInfo
					/>
					<TextInputWithCounter
						register={registers.recipient}
						required
						label="Одержувач"
						placeholder=""
						maxLength={98}
						errors={errors}
						showInfo
					/>
					<TextInputWithCounter
						register={registers.IBAN}
						required
						label="IBAN"
						placeholder=""
						maxLength={29}
						errors={errors}
						showInfo
					/>
					<TextInputWithCounter
						register={registers.IPN}
						required
						label="IPN"
						placeholder=""
						maxLength={10}
						errors={errors}
						showInfo
					/>

					<TextInputWithCounter
						register={registers.paymentPurpose}
						required
						label="Призначення платежу"
						placeholder=""
						maxLength={40}
						errors={errors}
						showInfo
					/>

					<ActionButtons
						onRemove={query?.id !== 'new' ? handleOnModalRemoveYesClick : undefined}
						onReset={handleOnModalCancelYesClick}
						onSave={handleSubmit(onSubmit)}
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
