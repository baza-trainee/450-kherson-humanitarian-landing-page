import { useEffect } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import imageCompression from 'browser-image-compression';

import ActionButtons from '~/pageComponents/AdminPage/components/ActionButtons/ActionButtons';
import { UseAboutUsState } from '~/pageComponents/AdminPage/store/useAboutUsState';
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
	const { isModalChangesOpen, activeTabId, setIsBlocked, setIsModalChangesOpen } = useTabsState(
		(state) => ({
			isModalChangesOpen: state.isModalChangesOpen,
			activeTabId: state.activeTabId,
			setIsBlocked: state.setIsBlocked,
			setIsModalChangesOpen: state.setIsModalChangesOpen,
		}),
	);
	const {
		isSuccess,
		isLoading,
		aboutUsData,
		setIsSuccess,
		getAboutUsDataById,
		changeAboutUsDataBoard,
		changeAboutUsFundDataBoard,
	} = UseAboutUsState((state) => ({
		isSuccess: state.isSuccess,
		isLoading: state.isLoading,
		aboutUsData: state.aboutUsData,
		setIsSuccess: state.setIsSuccess,
		getAboutUsDataById: state.getAboutUsDataById,
		changeAboutUsDataBoard: state.changeAboutUsDataBoard,
		changeAboutUsFundDataBoard: state.changeAboutUsFundDataBoard,
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

			await changeAboutUsFundDataBoard(body);
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
				await changeAboutUsDataBoard(body, activeTabId);
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
				setIsBlocked(true);
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
					/>
					{
						isSuccess && (
							<ModalPop
								isOpen={isSuccess}
								onClose={setIsSuccess}
								title="Вітаємо!"
								leftButton={() => <Button onClick={setIsSuccess}>Ок</Button>}
							>
								Ваші дані успішно збережено
							</ModalPop>
						) //add modal on success saving data on server
					}
					{
						isModalChangesOpen && (
							<ModalPop
								isOpen={isModalChangesOpen}
								onClose={() => setIsModalChangesOpen(false)}
								title="Увага!"
								type="error"
								leftButton={() => (
									<Button onClick={() => setIsModalChangesOpen(false)}>Зрозуміло</Button>
								)}
							>
								На сторінці є незбережені зміни. Для продовження необхідно зберегти або
								скасувати зміни
							</ModalPop>
						) //add modal on clicking between tabs if are changes in form
					}
				</form>
			)}
		</>
	);
}
