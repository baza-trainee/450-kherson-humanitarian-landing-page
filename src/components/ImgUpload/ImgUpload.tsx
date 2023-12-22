import { forwardRef, useEffect, useState } from 'react';
import type { FieldErrors, FieldValues } from 'react-hook-form';

import clsx from 'clsx';
import Image from 'next/image';

import { Icon } from '~components/Icon/Icon';
import { BASE_URL } from '~constants/BASE_URL';

import s from './ImgUpload.module.scss';

export type ImgUploadElement = HTMLInputElement;

interface ImgUploadProps {
	register?: FieldValues;
	watch?: (name: string) => FieldValues;
	errors?: FieldErrors<FieldValues>;
	handleImageDelete?: () => void;
}

export const ImgUpload = forwardRef<ImgUploadElement, ImgUploadProps>(
	({ register, watch, errors, handleImageDelete }, ref) => {
		const [image, setImage] = useState<string>('');
		const [imageError, setImageError] = useState<string>('');

		const file = watch ? watch(register ? register.name : null) : null;

		const nameArr = register?.name.split('.');
		let error;
		if ((errors as FieldValues)?.[nameArr[0]]?.[nameArr[1]]?.[nameArr[2]]) error = true;
		if (errors?.[register?.name]) error = true;

		useEffect(() => {
			if (watch && file) {
				if (typeof file === 'string') {
					const imgUrl = process.env.NODE_ENV === 'development' ? `${BASE_URL}${file}` : file;
					setImage(imgUrl);
					setImageError('');
				} else if (file.length > 0) {
					setImage(URL.createObjectURL(file[0]));
					setImageError('');
				}
			} else setImage('');
			setImageError('');
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [file]);

		let borderStyle = { border: '1px solid var(--color--secondary-2)' };
		if (error) borderStyle = { border: '1px solid var(--color--error-1)' };
		if (image) borderStyle = { border: 'none' };

		let imageClassName = s.imgDefault;
		if (image) imageClassName = s.img;
		if (imageError) imageClassName = clsx(s.img, s.imgError);

		const imageOnErrorHandler = () => {
			setImageError('Помилка завантаження зображення');
			setImage('');
		};

		return (
			<div className={s.ImgUpload}>
				<div className={s.imgBlock} style={borderStyle}>
					<Image
						priority={true}
						src={image ? image : '/svg/blank-img.svg'}
						alt="main-hero-board-image"
						width={image ? 712 : 100}
						height={image ? 300 : 100}
						className={imageClassName}
						onError={imageOnErrorHandler}
					/>
					{imageError && <div className={s.imgErrorMsg}>{imageError}</div>}
				</div>
				<div className={s.iconBlock}>
					<label>
						<Icon icon="icon--upload" className={s.icon} />
						<input
							type="file"
							className={s.hidden}
							ref={ref}
							accept="image/*, .png, .jpeg, .web"
							{...register}
						/>
					</label>
					{handleImageDelete && (
						<Icon icon="icon--trash" className={s.icon} onClick={handleImageDelete} />
					)}
				</div>
			</div>
		);
	},
);

ImgUpload.displayName = 'ImgUpload';
