import { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/router';

import ActionButtons from '~/pageComponents/AdminPage/components/ActionButtons/ActionButtons';
import { useFooterState } from '~/pageComponents/AdminPage/store/useFooterState';
import { useTabsState } from '~/pageComponents/AdminPage/store/useTabsState';
import { Button } from '~components/Buttons/Button';
import { FileUpload } from '~components/FileUpload/FileUpload';
import { TextArea } from '~components/inputs/TextArea/TextArea';
import { TextInputWithCounter } from '~components/inputs/TextInput/TextInputWithCounter';
import { Loader } from '~components/Loader/Loader';
import { ModalPop } from '~components/ModalPop/ModalPop';

import s from './FooterBoard.module.scss';

interface FormFields {
	email?: string;
	address?: string;
	rules?: string;
	contract?: string;
	privacy?: string;
	statut?: string;
}

export function FooterBoard() {
	const { isTabsClickBlocked, setIsTabsClickBlocked } = useTabsState((state) => ({
		isTabsClickBlocked: state.isTabsClickBlocked,
		setIsTabsClickBlocked: state.setIsTabsClickBlocked,
	}));

	const router = useRouter();
	const { query } = router;

	const {
		isModalOnSuccessSaveOpen,
		isLoading,
		contactsData,
		documentsData,
		stateError,
		setIsModalOnSuccessSaveClose,
		getContactsData,
		getDocumentsData,
		updateContactsData,
		updateDocumentData,
	} = useFooterState((state) => ({
		isModalOnSuccessSaveOpen: state.isModalOnSuccessSaveOpen,
		isLoading: state.isLoading,
		contactsData: state.contactsData,
		documentsData: state.documentsData,
		stateError: state.error,
		setIsModalOnSuccessSaveClose: state.setIsModalOnSuccessSaveClose,
		getContactsData: state.getContactsData,
		getDocumentsData: state.getDocumentsData,
		updateContactsData: state.updateContactsData,
		updateDocumentData: state.updateDocumentData,
	}));

	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			if (query.id === 'contacts') {
				await getContactsData();
			} else getDocumentsData();
		};
		fetchData();
		setErrorMessage('');
		//*set data from server into state
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query?.id]);

	useEffect(() => {
		//*set message to show in Modal Error
		if (stateError) {
			if (stateError.status === 406)
				setErrorMessage('Не правильно введені дані. Можливо є зайві символи');
			if (stateError.status === 500) setErrorMessage(stateError.message);
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

	const registers =
		query?.id === 'contacts'
			? {
					email: register('email', {
						required: true,
						pattern: {
							value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
							message: 'Введіть правильне значення',
						},
					}),
					address: register('address', {
						required: true,
					}),
			  }
			: {
					rules: register('rules'),
					contract: register('contract'),
					privacy: register('privacy'),
					statut: register('statut'),
			  };

	useEffect(() => {
		if (query.id === 'contacts' && contactsData) {
			setValue('email', contactsData.email);
			setValue('address', contactsData.address);
		} else if (query.id === 'documents' && documentsData) {
			setValue('rules', documentsData.rules || '0');
			setValue('contract', documentsData.contract || '0');
			setValue('privacy', documentsData.privacy || '0');
			setValue('statut', documentsData.statut || '0');
		}

		setErrorMessage('');
		clearErrors();
		setIsTabsClickBlocked(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [contactsData, documentsData]);

	const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
		if (query?.id === 'contacts') {
			const body = {
				email: data.email || '',
				address: data.address?.split('\n').join('/n') || '',
			};
			updateContactsData(body);
		} else if (query?.id === 'documents') {
			console.log('form data', data); //-----------------------------log
			// getDocumentsData();
		}
		setIsTabsClickBlocked(false);
	};

	//* need to check if some changes at form, then set isBlocked to true, in order to block clicking between tabs
	useEffect(() => {
		watch((value) => {
			if (
				(query?.id === 'contacts' &&
					(value.email !== contactsData?.email || value.address !== contactsData?.address)) ||
				(query?.id === 'documents' &&
					(value.rules !== documentsData?.rules ||
						value.contract !== documentsData?.contract ||
						value.statut !== documentsData?.statut ||
						value.privacy !== documentsData?.privacy))
			) {
				setIsTabsClickBlocked(true);
			} else setIsTabsClickBlocked(false);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watch, contactsData, documentsData]);

	const handleOnModalCancelYesClick = async () => {
		if (query?.id === 'contacts' && contactsData) {
			reset({
				email: contactsData.email,
				address: contactsData.address,
			});
		} else if (documentsData && query?.id === 'documents') {
			reset({
				rules: documentsData.rules,
				contract: documentsData.contract,
				privacy: documentsData.privacy,
				statut: documentsData.statut,
			});
		}
		setErrorMessage('');
		setIsTabsClickBlocked(false);
	};

	const deleteFile = (name: string) => {
		console.log('delete', name);
	};

	return (
		<>
			{(isLoading || (!contactsData && !documentsData)) && <Loader />}
			{!isLoading && (
				<form onSubmit={handleSubmit(onSubmit)} className={s.form}>
					{query?.id === 'contacts' && contactsData && (
						<>
							<TextArea
								rows={5}
								register={registers.address}
								required
								label="Адреса"
								placeholder=""
								maxLength={900}
								errors={errors}
								showInfo
							/>
							<TextInputWithCounter
								register={registers.email}
								required
								label="Електронна пошта"
								placeholder=""
								maxLength={45}
								errors={errors}
								showInfo
							/>
						</>
					)}

					{query?.id === 'documents' && (
						<>
							<FileUpload
								register={registers.rules}
								watch={watch}
								label="Правила та умови"
								deleteFile={deleteFile}
							/>
							<FileUpload
								register={registers.contract}
								watch={watch}
								label="Договір публічної оферти"
								deleteFile={deleteFile}
							/>
							<FileUpload
								register={registers.privacy}
								watch={watch}
								label="Конфіденційність"
								deleteFile={deleteFile}
							/>
							<FileUpload
								register={registers.statut}
								watch={watch}
								label="Статут ГО"
								deleteFile={deleteFile}
							/>
						</>
					)}
					<ActionButtons
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
