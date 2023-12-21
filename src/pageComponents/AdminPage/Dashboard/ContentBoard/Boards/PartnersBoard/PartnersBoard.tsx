import { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import imageCompression from 'browser-image-compression';
import { useRouter } from 'next/router';

import ActionButtons from '~/pageComponents/AdminPage/components/ActionButtons/ActionButtons';
import { usePartnersState } from '~/pageComponents/AdminPage/store/usePartnersState';
import { useTabsState } from '~/pageComponents/AdminPage/store/useTabsState';
import { Button } from '~components/Buttons/Button';
import { ImgUpload } from '~components/ImgUpload/ImgUpload';
import { Loader } from '~components/Loader/Loader';
import { ModalPop } from '~components/ModalPop/ModalPop';

import { fetchPartnersData } from '../../../Tabs/fetchHelpers/fetchPartnersData';
import { EmptyBoard } from '../EmptyBoard/EmptyBoard';

interface PartnersFormFieldValues {
	image: FileList | string;
}

export function PartnersBoard() {
	const router = useRouter();
	const { query } = router;

	const { getTabsData, setIsTabsClickBlocked, isTabsClickBlocked } = useTabsState((state) => ({
		getTabsData: state.getTabsData,
		setIsTabsClickBlocked: state.setIsTabsClickBlocked,
		isTabsClickBlocked: state.isTabsClickBlocked,
	}));

	const {
		isModalOnSuccessSaveOpen,
		isLoading,
		partnersBoardData,
		stateError,
		getPartnersBoardById,
		updatePartnersBoard,
		deletePartnersBoardById,
		addNewEmptyPartnersBoard,
		addNewPartnersBoard,
		setIsModalOnSuccessSaveClose,
	} = usePartnersState((state) => ({
		isModalOnSuccessSaveOpen: state.isModalOnSuccessSaveOpen,
		isLoading: state.isLoading,
		partnersBoardData: state.partnersBoardData,
		stateError: state.error,
		getPartnersBoardById: state.getPartnersBoardById,
		updatePartnersBoard: state.updatePartnersBoard,
		deletePartnersBoardById: state.deletePartnersBoardById,
		addNewEmptyPartnersBoard: state.addNewEmptyPartnersBoard,
		addNewPartnersBoard: state.addNewPartnersBoard,
		setIsModalOnSuccessSaveClose: state.setIsModalOnSuccessSaveClose,
	}));

	const [errorMessage, setErrorMessage] = useState('');

	const {
		watch,
		register,
		formState: { errors, isValid },
		handleSubmit,
		setValue,
		reset,
		clearErrors,
	} = useForm<PartnersFormFieldValues>({
		mode: 'onSubmit',
	});

	const registers = {
		image: register('image', {
			required: partnersBoardData?.image ? false : true,
		}),
	};

	useEffect(() => {
		//*set message to show in Modal Error
		if (stateError) {
			setErrorMessage(stateError.message);
		}
	}, [stateError]);

	useEffect(() => {
		const fetchData = async () => {
			if (query?.id) await getPartnersBoardById(query?.id.toString());
		};
		if (query?.id !== 'new' && query?.id !== 'empty') fetchData();
		else addNewEmptyPartnersBoard();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query?.id]);

	useEffect(() => {
		if (partnersBoardData) {
			setValue('image', partnersBoardData.image);
			clearErrors();
			setIsTabsClickBlocked(false);
		}
		if (query?.id === 'new') {
			setValue('image', '');
			clearErrors();
			setIsTabsClickBlocked(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [partnersBoardData, query?.id]);

	useEffect(() => {
		watch((value) => {
			if (value.image !== partnersBoardData?.image) {
				setIsTabsClickBlocked(true);
			} else {
				setIsTabsClickBlocked(false);
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watch, partnersBoardData]);

	const onSubmit: SubmitHandler<PartnersFormFieldValues> = async (
		data: PartnersFormFieldValues,
	) => {
		let image = '',
			type = '';
		const options = {
			maxSizeMB: 0.488,
			maxWidthOrHeight: 1920,
		};

		try {
			if (data.image && data.image.length > 0 && typeof data.image !== 'string') {
				const compressedFile = await imageCompression(data.image[0], options);

				await imageCompression
					.getDataUrlFromFile(compressedFile)
					.then((dataImage) => (image = dataImage.toString()));
				type = data.image[0].type;
			} else {
				image = partnersBoardData?.image || '';
			}
		} catch (error) {
			console.error('Error:', error);
		}

		const body = {
			id: query?.id && query?.id !== 'new' ? query?.id.toString() : '',
			picture: {
				mime_type: type,
				image: image.split(',')[1],
			},
		};

		query?.id === 'new' ? await addNewPartnersBoard(body) : await updatePartnersBoard(body);
		setIsTabsClickBlocked(false);
		await getTabsData(fetchPartnersData);
	};

	const handleOnModalRemoveYesClick = async () => {
		if (query?.id) {
			await deletePartnersBoardById(query?.id.toString());
			await getTabsData(fetchPartnersData);
		}
	};

	const handleOnModalCancelYesClick = async () => {
		if (partnersBoardData) {
			reset({
				image: partnersBoardData.image,
			});
			setIsTabsClickBlocked(false);
		}
	};

	return (
		<>
			{(isLoading || !partnersBoardData) && query?.id !== 'empty' && <Loader />}
			{!isLoading && query?.id && query?.id === 'empty' && <EmptyBoard />}
			{!isLoading && query?.id !== 'empty' && partnersBoardData && (
				<form>
					<ImgUpload register={registers.image} watch={watch} errors={errors} />
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
