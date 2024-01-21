import { useEffect, useState } from 'react';
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
	const [isModalMinTabsLengthOpen, setIsModalMinTabsLengthOpen] = useState(false);

	const router = useRouter();
	const { query } = router;

	const { tabsData, getTabsData, setIsTabsClickBlocked, isTabsClickBlocked } = useTabsState(
		(state) => ({
			tabsData: state.tabsData,
			getTabsData: state.getTabsData,
			setIsTabsClickBlocked: state.setIsTabsClickBlocked,
			isTabsClickBlocked: state.isTabsClickBlocked,
		}),
	);

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
			required: ourActivityBoardData?.src ? false : true,
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
			setValue('image', ourActivityBoardData.src);
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
			if (value.image !== ourActivityBoardData?.src) {
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
				image = ourActivityBoardData?.src || '';
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
		if (query?.id && tabsData?.tabs) {
			if (tabsData?.tabs.length > 4) {
				await deleteOurActivityBoardById(query?.id.toString());
				await getTabsData(fetchOurActivityData);
			} else setIsModalMinTabsLengthOpen(true);
		}
	};

	const handleOnModalCancelYesClick = async () => {
		if (ourActivityBoardData) {
			reset({
				image: ourActivityBoardData.src,
			});
			setIsTabsClickBlocked(false);
		}
	};

	const handleOnModalIsLengthClose = () => setIsModalMinTabsLengthOpen(false);

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
					{isModalMinTabsLengthOpen && (
						<ModalPop
							type="error"
							isOpen={isModalMinTabsLengthOpen}
							onClose={handleOnModalIsLengthClose}
							title="Увага!"
							leftButton={() => <Button onClick={handleOnModalIsLengthClose}>Ок</Button>}
						>
							Мінімальна кількість фото у блоці не повинна бути менше 4.
						</ModalPop>
					)}
				</form>
			)}
		</>
	);
}
