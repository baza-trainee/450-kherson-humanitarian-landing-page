import { useEffect } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import ActionButtons from '~/pageComponents/AdminPage/components/ActionButtons/ActionButtons';
import { UseAboutUsState } from '~/pageComponents/AdminPage/store/useAboutUsState';
import { useTabsState } from '~/pageComponents/AdminPage/store/useTabsState';
import { ImgUpload } from '~components/ImgUpload/ImgUpload';
import { TextInputWithCounter } from '~components/inputs/TextInput/TextInputWithCounter';
import { Loader } from '~components/Loader/Loader';

interface FormFields {
	image: FileList | string;
	title?: string;
	text?: string;
}

export function AboutUsBoard() {
	const activeTabId = useTabsState((state) => state.activeTabId);
	const {
		isSuccess,
		isLoading,
		aboutUsData,
		getAboutUsDataById,
		changeAboutUsDataBoard,
		changeAboutUsFundDataBoard,
	} = UseAboutUsState((state) => ({
		isSuccess: state.isSuccess,
		isLoading: state.isLoading,
		aboutUsData: state.aboutUsData,
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
		console.log('submit data', data);
	};

	const handleOnModalCancelYesClick = async () => {
		if (aboutUsData && activeTabId === 'fund') {
			reset({
				image: aboutUsData.image,
			});
		}
		if (aboutUsData && activeTabId !== 'fund') {
			reset({
				image: aboutUsData.image,
				title: aboutUsData.title,
				text: aboutUsData.text,
			});
		}
	};
	console.log('errors', errors);

	return (
		<>
			{(isLoading || !aboutUsData) && activeTabId !== 'empty' && <Loader />}
			{!isLoading && activeTabId !== 'empty' && aboutUsData && (
				<form onSubmit={handleSubmit(onSubmit)}>
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
				</form>
			)}
		</>
	);
}
