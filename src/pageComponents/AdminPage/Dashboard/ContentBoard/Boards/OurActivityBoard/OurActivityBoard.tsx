import { useEffect, useState } from 'react';
import type { DeepPartial, FieldValues, SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { useBoardsState } from '~/pageComponents/AdminPage/store/useBoardsState';
import { useTabsState } from '~/pageComponents/AdminPage/store/useTabsState';
import { Button } from '~components/Buttons/Button';
import { ImgUpload } from '~components/ImgUpload/ImgUpload';
import { Loader } from '~components/Loader/Loader';

import s from './OurActivityBoard.module.scss';

type CustomFieldValues = DeepPartial<FieldValues> & {
	imageUrl: string;
	id: string;
};

export function OurActivityBoard() {
	const [image, setImage] = useState<string>('');
	const [formDefaultValues, setFormDefaultValues] = useState({
		imageUrl: '',
		id: '',
	});

	const { activeTabId } = useTabsState((state) => ({
		activeTabId: state.activeTabId,
	}));

	const { isLoading, ourActivityBoardData } = useBoardsState((state) => ({
		isLoading: state.isLoading,
		ourActivityBoardData: state.ourActivityBoardData,
	}));

	useEffect(() => {
		if (ourActivityBoardData) {
			setFormDefaultValues({
				imageUrl: ourActivityBoardData.imageUrl,
				id: ourActivityBoardData.id,
			});
		}
	}, [ourActivityBoardData]);

	const {
		watch,
		register,
		formState: { errors },
		handleSubmit,
		setValue,
	} = useForm({
		mode: 'onSubmit',
		defaultValues: formDefaultValues,
	});

	useEffect(() => {
		if (ourActivityBoardData) {
			setValue('imageUrl', ourActivityBoardData.imageUrl);
			setValue('id', ourActivityBoardData.id);
		}
	}, [ourActivityBoardData, setValue]);

	const convertToBase64 = (file: Blob) => {
		const reader = new FileReader();
		reader.onloadend = () => {
			if (reader.result) setImage(reader.result.toString());
		};
		reader.readAsDataURL(file);
	};

	const onSubmit: SubmitHandler<CustomFieldValues> = (data: CustomFieldValues) => {
		console.log(convertToBase64(data.imageUrl[0]));
		// if (data.files.length > 0) {

		// 	convertToBase64(data.files[0]);
		// }
	};

	return (
		<>
			{(isLoading || !ourActivityBoardData) && <Loader />}
			{!isLoading && activeTabId && ourActivityBoardData && (
				<form onSubmit={handleSubmit(onSubmit)}>
					<ImgUpload register={register('imageUrl')} watch={watch} defaultImageUrl={image} />
					{/* <ImgUpload /> */}
					<div className={s.buttons}>
						<Button type="secondary" className={s.delete}>
							Видалити блок
						</Button>
						<Button type="secondary">Скасувати зміни</Button>
						<Button submit>Зберегти</Button>
					</div>
				</form>
			)}
		</>
	);
}
