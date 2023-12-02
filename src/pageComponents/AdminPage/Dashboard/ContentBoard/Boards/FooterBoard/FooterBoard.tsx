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
import { getErrorMessageFromCode } from '~helpers/getErrorMessageFromCode';

import s from './FooterBoard.module.scss';

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
interface FormFieldsKeys {
	[key: string]: string | FileList;
}

interface FormFields extends FormFieldsKeys {
	email: string;
	address: string;
	rules: string | FileList;
	contract: string | FileList;
	privacy: string | FileList;
	statut: string | FileList;
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
		deleteDocumentByName,
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
		deleteDocumentByName: state.deleteDocumentByName,
	}));

	const [errorMessage, setErrorMessage] = useState('');
	const [isDocumentRemoveName, setIsDocumentRemoveName] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			if (query.id === 'contacts') {
				await getContactsData();
			} else await getDocumentsData();
		};
		fetchData();
		setErrorMessage('');
		//*set data from server into state
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
		if (query?.id === 'contacts') {
			const body = {
				email: data.email || '',
				address: data.address?.split('\n').join('/n') || '',
			};
			await updateContactsData(body);
		} else if (query?.id === 'documents') {
			for (const key in data) {
				if (
					data[key] &&
					data[key].length > 0 &&
					typeof data[key] !== 'string' &&
					(data[key][0] as File).size < 10000000
				) {
					const convertFile = await convertToBase64(data[key][0] as File);
					const body = {
						type: key,
						file: {
							mime: (data[key][0] as File).type,
							data: convertFile.split(',')[1],
						},
					};
					await updateDocumentData(body);
					await getDocumentsData();
				}
			}
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

	const handleRemoveOnClick = (name: string) => {
		setIsDocumentRemoveName(name);
	};

	const handleConfirmRemoveOnClick = async () => {
		await deleteDocumentByName(isDocumentRemoveName);
		setIsDocumentRemoveName('');
		await getDocumentsData();
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
								deleteFile={handleRemoveOnClick}
							/>
							<FileUpload
								register={registers.contract}
								watch={watch}
								label="Договір публічної оферти"
								deleteFile={handleRemoveOnClick}
							/>
							<FileUpload
								register={registers.privacy}
								watch={watch}
								label="Конфіденційність"
								deleteFile={handleRemoveOnClick}
							/>
							<FileUpload
								register={registers.statut}
								watch={watch}
								label="Статут ГО"
								deleteFile={handleRemoveOnClick}
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
							title="Виникла помилка!"
							isOpen={!!errorMessage}
							onClose={() => setErrorMessage('')}
						>
							{errorMessage}
						</ModalPop>
					)}
					{isDocumentRemoveName && (
						<ModalPop
							type="error"
							title={'Видалити?'}
							isOpen={!!isDocumentRemoveName}
							onClose={() => setIsDocumentRemoveName('')}
							leftButton={() => (
								<Button type="secondary" onClick={() => handleConfirmRemoveOnClick()}>
									Так
								</Button>
							)}
							rightButton={() => (
								<Button onClick={() => setIsDocumentRemoveName('')}>Ні</Button>
							)}
						>
							Ви дійсно бажаєте видалити документ?
						</ModalPop>
					)}
				</form>
			)}
		</>
	);
}
