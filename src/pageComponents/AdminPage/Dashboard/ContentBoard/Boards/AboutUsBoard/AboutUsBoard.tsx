import { useEffect } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import imageCompression from 'browser-image-compression';

import ActionButtons from '~/pageComponents/AdminPage/components/ActionButtons/ActionButtons';
import { useAboutUsState } from '~/pageComponents/AdminPage/store/useAboutUsState';
import { useTabsState } from '~/pageComponents/AdminPage/store/useTabsState';
import { Button } from '~components/Buttons/Button';
import { ImgUpload } from '~components/ImgUpload/ImgUpload';
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
	const { activeTabId, isTabsClickBlocked, setIsTabsClickBlocked } = useTabsState((state) => ({
		activeTabId: state.activeTabId,
		isTabsClickBlocked: state.isTabsClickBlocked,
		setIsTabsClickBlocked: state.setIsTabsClickBlocked,
	}));
	const {
		isModalOnSuccessSaveOpen,
		isLoading,
		aboutUsData,
		setIsModalOnSuccessSaveClose,
		getAboutUsDataById,
		updateAboutUsDataBoard,
		updateAboutUsFundDataBoard,
	} = useAboutUsState((state) => ({
		isModalOnSuccessSaveOpen: state.isModalOnSuccessSaveOpen,
		isLoading: state.isLoading,
		aboutUsData: state.aboutUsData,
		setIsModalOnSuccessSaveClose: state.setIsModalOnSuccessSaveClose,
		getAboutUsDataById: state.getAboutUsDataById,
		updateAboutUsDataBoard: state.updateAboutUsDataBoard,
		updateAboutUsFundDataBoard: state.updateAboutUsFundDataBoard,
	}));

	useEffect(() => {
		const fetchData = async () => {
			if (activeTabId) await getAboutUsDataById(activeTabId);
		};
		fetchData();
		//*set data from server into state
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeTabId]);

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
		activeTabId === 'fund'
			? {
					image: register('image', {
						required: aboutUsData?.image ? false : true, //---need to have empty state
					}),
			  }
			: {
					image: register('image', {
						required: aboutUsData?.image ? false : true, //---need to have empty state
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
			if (activeTabId === 'fund') {
				setValue('image', aboutUsData.image);
			} else {
				setValue('image', aboutUsData.image);
				setValue('title', aboutUsData.title);
				setValue('text', aboutUsData.text);
			}
			clearErrors();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [aboutUsData, activeTabId]);

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
		if (activeTabId == 'fund') {
			const body = {
				picture: {
					mime_type: type,
					image: image.split(',')[1],
				},
			};
			console.log('body', body);

			await updateAboutUsFundDataBoard(body);
		} else {
			if (data.title && data.text && activeTabId) {
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
				await updateAboutUsDataBoard(body, activeTabId);
			}
		}
	};

	useEffect(() => {
		watch((value) => {
			//* need to check if some changes at form, then set isBlocked to true, in order to block clicking between tabs
			if (
				value.image !== aboutUsData?.image ||
				value.title !== aboutUsData?.title ||
				value.text !== aboutUsData?.text
			) {
				setIsTabsClickBlocked(true);
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watch, aboutUsData]);

	const handleOnModalCancelYesClick = async () => {
		if (aboutUsData) {
			if (activeTabId === 'fund') {
				reset({
					image: aboutUsData.image,
				});
			} else {
				reset({
					image: aboutUsData.image,
					title: aboutUsData.title,
					text: aboutUsData.text,
				});
			}
		}
	};

	return (
		<>
			{(isLoading || !aboutUsData) && activeTabId !== 'empty' && <Loader />}
			{!isLoading && activeTabId !== 'empty' && aboutUsData && (
				<form onSubmit={handleSubmit(onSubmit)} className={s.form}>
					<ImgUpload register={registers.image} watch={watch} errors={errors} />
					{activeTabId !== 'fund' && (
						<>
							<TextInputWithCounter
								register={registers.title}
								required
								label="Блок"
								placeholder=""
								maxLength={45}
								errors={errors}
								showInfo
							/>
							<TextInputWithCounter
								// type=''
								size={5}
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
				</form>
			)}
		</>
	);
}
