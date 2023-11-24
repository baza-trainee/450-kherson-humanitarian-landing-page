import { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import imageCompression from 'browser-image-compression';
import { useRouter } from 'next/router';

import ActionButtons from '~/pageComponents/AdminPage/components/ActionButtons/ActionButtons';
import { useAboutUsState } from '~/pageComponents/AdminPage/store/useAboutUsState';
import { useTabsState } from '~/pageComponents/AdminPage/store/useTabsState';
import { Button } from '~components/Buttons/Button';
import { ImgUpload } from '~components/ImgUpload/ImgUpload';
import { TextArea } from '~components/inputs/TextArea/TextArea';
import { TextInputWithCounter } from '~components/inputs/TextInput/TextInputWithCounter';
import { Loader } from '~components/Loader/Loader';
import { ModalPop } from '~components/ModalPop/ModalPop';

import s from './AboutUsBoard.module.scss';

interface FormFields {
	image: FileList | string;
	title?: string;
	text?: string;
}

export function AboutUsBoard() {
	const { isTabsClickBlocked, setIsTabsClickBlocked } = useTabsState((state) => ({
		isTabsClickBlocked: state.isTabsClickBlocked,
		setIsTabsClickBlocked: state.setIsTabsClickBlocked,
	}));

	const router = useRouter();
	const { query } = router;

	const {
		isModalOnSuccessSaveOpen,
		isLoading,
		aboutUsData,
		stateError,
		setIsModalOnSuccessSaveClose,
		getAboutUsDataById,
		updateAboutUsDataBoard,
		updateAboutUsFundDataBoard,
	} = useAboutUsState((state) => ({
		isModalOnSuccessSaveOpen: state.isModalOnSuccessSaveOpen,
		isLoading: state.isLoading,
		aboutUsData: state.aboutUsData,
		stateError: state.error,
		setIsModalOnSuccessSaveClose: state.setIsModalOnSuccessSaveClose,
		getAboutUsDataById: state.getAboutUsDataById,
		updateAboutUsDataBoard: state.updateAboutUsDataBoard,
		updateAboutUsFundDataBoard: state.updateAboutUsFundDataBoard,
	}));

	useEffect(() => {
		const fetchData = async () => {
			if (query?.id) {
				await getAboutUsDataById(query?.id.toString());
			}
		};
		fetchData();
		//*set data from server into state
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query?.id]);

	const [errorMessage, setErrorMessage] = useState('');

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
		query?.id === 'fund'
			? {
					image: register('image', {
						required: aboutUsData?.image ? false : true,
					}),
			  }
			: {
					image: register('image', {
						required: aboutUsData?.image ? false : true,
					}),
					title: register('title', {
						required: true,
					}),
					text: register('text', {
						required: true,
					}),
			  };

	useEffect(() => {
		if (aboutUsData) {
			if (query.id === 'fund') {
				setValue('image', aboutUsData.image);
			} else {
				setValue('image', aboutUsData.image);
				setValue('title', aboutUsData.title);
				setValue('text', aboutUsData.text);
			}
		}
		clearErrors();
		setIsTabsClickBlocked(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [aboutUsData]);

	const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
		let image = '',
			type = '';
		const options = {
			maxSizeMB: 0.488,
			maxWidthOrHeight: 1920,
		};

		try {
			if (data.image.length > 0 && typeof data.image !== 'string') {
				const compressedFile = await imageCompression(data.image[0], options);

				await imageCompression
					.getDataUrlFromFile(compressedFile)
					.then((dataImage) => (image = dataImage.toString()));
				type = data.image[0].type;
			} else image = aboutUsData?.image || '';
		} catch (error) {
			console.error('Error imageCompression:', error); //-----------------------------log
		}

		if (query?.id == 'fund') {
			const body = {
				picture: {
					mime_type: type,
					image: image.split(',')[1],
				},
			};
			await updateAboutUsFundDataBoard(body);
		} else {
			if (data.title && data.text && query?.id) {
				const body =
					data.image === aboutUsData?.image
						? {
								title: data.title,
								text: data.text,
						  }
						: {
								picture: {
									mime_type: type,
									image: image.split(',')[1],
								},
								title: data.title,
								text: data.text,
						  };
				await updateAboutUsDataBoard(body, query?.id.toString());
			}
		}
		setIsTabsClickBlocked(false);
	};

	//* need to check if some changes at form, then set isBlocked to true, in order to block clicking between tabs
	useEffect(() => {
		watch((value) => {
			if (
				(query?.id === 'fund' && value.image !== aboutUsData?.image) ||
				(query?.id !== 'fund' &&
					(value.image !== aboutUsData?.image ||
						value.title !== aboutUsData?.title ||
						value.text !== aboutUsData?.text))
			) {
				setIsTabsClickBlocked(true);
			} else setIsTabsClickBlocked(false);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watch, aboutUsData]);

	const handleOnModalCancelYesClick = async () => {
		if (query?.id === 'fund' && aboutUsData) {
			reset({
				image: aboutUsData.image,
			});
		} else if (aboutUsData && query?.id !== 'fund') {
			reset({
				image: aboutUsData.image,
				title: aboutUsData.title,
				text: aboutUsData.text,
			});
		}
		setIsTabsClickBlocked(false);
	};

	let titleLabel;
	if (query?.id === 'team') titleLabel = 'Блок 1';
	if (query?.id === 'history') titleLabel = 'Блок 2';

	return (
		<>
			{(isLoading || !aboutUsData) && <Loader />}
			{!isLoading && aboutUsData && (
				<form onSubmit={handleSubmit(onSubmit)} className={s.form}>
					<ImgUpload register={registers.image} watch={watch} errors={errors} />

					{query?.id !== 'fund' && (
						<>
							<TextInputWithCounter
								register={registers.title}
								required
								label={titleLabel}
								placeholder=""
								maxLength={45}
								errors={errors}
								showInfo
							/>
							<TextArea
								rows={15}
								register={registers.text}
								required
								label="Текст"
								placeholder=""
								maxLength={900}
								errors={errors}
								showInfo
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
