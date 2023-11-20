import { useEffect } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import imageCompression from 'browser-image-compression';
import { useRouter } from 'next/router';

import ActionButtons from '~/pageComponents/AdminPage/components/ActionButtons/ActionButtons';
import { useOurActivityState } from '~/pageComponents/AdminPage/store/useOurActivityState';
import { useTabsState } from '~/pageComponents/AdminPage/store/useTabsState';
import { Button } from '~components/Buttons/Button';
import { ImgUpload } from '~components/ImgUpload/ImgUpload';
import { Loader } from '~components/Loader/Loader';
import { ModalPop } from '~components/ModalPop/ModalPop';

import { fetchOurActivityData } from '../../../Tabs/fetchHelpers/fetchOurActivityData';
import { EmptyBoard } from '../EmptyBoard/EmptyBoard';

interface OurActivityFormFieldValues {
	image: FileList | string;
}

export function OurActivityBoard() {
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
		ourActivityBoardData,
		getOurActivityBoardById,
		updateOurActivityBoard,
		deleteOurActivityBoardById,
		addNewEmptyOurActivityBoard,
		addNewOurActivityBoard,
		setIsModalOnSuccessSaveClose,
	} = useOurActivityState((state) => ({
		isModalOnSuccessSaveOpen: state.isModalOnSuccessSaveOpen,
		isLoading: state.isLoading,
		ourActivityBoardData: state.ourActivityBoardData,
		getOurActivityBoardById: state.getOurActivityBoardById,
		updateOurActivityBoard: state.updateOurActivityBoard,
		deleteOurActivityBoardById: state.deleteOurActivityBoardById,
		addNewEmptyOurActivityBoard: state.addNewEmptyOurActivityBoard,
		addNewOurActivityBoard: state.addNewOurActivityBoard,
		setIsModalOnSuccessSaveClose: state.setIsModalOnSuccessSaveClose,
	}));

	const {
		watch,
		register,
		formState: { errors, isValid },
		handleSubmit,
		setValue,
		reset,
		clearErrors,
	} = useForm<OurActivityFormFieldValues>({
		mode: 'onSubmit',
	});

	const registers = {
		image: register('image', {
			required: ourActivityBoardData?.imageUrl ? false : true,
		}),
	};

	useEffect(() => {
		const fetchData = async () => {
			if (query?.id) await getOurActivityBoardById(query?.id.toString());
		};
		if (query?.id !== 'new' && query?.id !== 'empty') fetchData();
		else addNewEmptyOurActivityBoard();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query?.id]);

	useEffect(() => {
		if (ourActivityBoardData) {
			setValue('image', ourActivityBoardData.imageUrl);
			clearErrors();
			setIsTabsClickBlocked(false);
		}
		if (query?.id === 'new') {
			setValue('image', '');
			clearErrors();
			setIsTabsClickBlocked(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ourActivityBoardData, query?.id]);

	useEffect(() => {
		watch((value) => {
			if (value.image !== ourActivityBoardData?.imageUrl) {
				setIsTabsClickBlocked(true);
			} else {
				setIsTabsClickBlocked(false);
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watch, ourActivityBoardData]);

	const onSubmit: SubmitHandler<OurActivityFormFieldValues> = async (
		data: OurActivityFormFieldValues,
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
				image = ourActivityBoardData?.imageUrl || '';
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

		query?.id === 'new' ? await addNewOurActivityBoard(body) : await updateOurActivityBoard(body);
		setIsTabsClickBlocked(false);
		await getTabsData(fetchOurActivityData);
	};

	const handleOnModalRemoveYesClick = async () => {
		if (query?.id) {
			await deleteOurActivityBoardById(query?.id.toString());
			await getTabsData(fetchOurActivityData);
		}
	};

	const handleOnModalCancelYesClick = async () => {
		if (ourActivityBoardData) {
			reset({
				image: ourActivityBoardData.imageUrl,
			});
			setIsTabsClickBlocked(false);
		}
	};

	return (
		<>
			{(isLoading || !ourActivityBoardData) && query?.id !== 'empty' && <Loader />}
			{!isLoading && query?.id && query?.id === 'empty' && <EmptyBoard />}
			{!isLoading && query?.id !== 'empty' && ourActivityBoardData && (
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
				</form>
			)}
		</>
	);
}
