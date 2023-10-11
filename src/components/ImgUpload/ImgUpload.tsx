import { useCallback, useEffect, useRef, useState } from 'react';
import type { FieldValues } from 'react-hook-form';

import Image from 'next/image';

import { Icon } from '~components/Icon/Icon';

import s from './ImgUpload.module.scss';
interface ImgUploadProps {
	register?: FieldValues;
	watch?: (name: string) => FieldValues;
	defaultImageUrl?: string;
}
export function ImgUpload({ register, watch, defaultImageUrl = '' }: ImgUploadProps) {
	const [image, setImage] = useState<string>(defaultImageUrl);
	// const fileClick = useRef<HTMLInputElement>(null);

	const files = watch ? watch(register ? register.name : null) : null;

	const setFileImages = (filesList: FileList | null) => {
		if (filesList && filesList.length > 0) {
			if (typeof filesList === 'string') {
				setImage(filesList);
			} else {
				const fileImage = URL.createObjectURL(filesList[0]);
				setImage(fileImage);
			}
		}
	};

	useEffect(() => {
		if (watch && files) setFileImages(files as FileList);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [files]);

	const handleInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!watch && defaultImageUrl) setFileImages(event.target.files);
	};

	// const changeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
	// 	if (event.target.files) {
	// 		setImage(URL.createObjectURL(event.target.files[0]));
	// 	}
	// };

	// const handleClick = () => {
	// 	console.log(fileClick.current);
	// 	if (fileClick.current) {
	// 		fileClick.current.click();
	// 	}
	// };

	const clearFile = () => {
		setImage('');
		if (fileClick.current) fileClick.current.value = '';
	};

	return (
		<div className={s.ImgUpload}>
			<div
				className={s.imgBlock}
				style={!image ? { border: '1px solid var(--color--secondary-2)' } : { border: 'none' }}
			>
				<Image
					priority={true}
					src={!image ? '/svg/blank-img.svg' : image}
					alt="card-img"
					width={!image ? 100 : 712}
					height={!image ? 100 : 300}
					className={!image ? s.imgDefault : s.img}
				/>
			</div>
			<div className={s.iconBlock}>
				{/* <Icon icon="icon--upload" className={s.icon} onClick={handleClick} /> */}
				<Icon icon="icon--trash" className={s.icon} onClick={clearFile} />
			</div>
			<label>
				<input
					type="file"
					className={s.hidden}
					// ref={fileClick}
					onChange={handleInputOnChange}
					accept="image/*, .png, .jpeg, .web"
					{...register}
				/>
				<Icon icon="icon--upload" className={s.icon} />
			</label>
		</div>
	);
}
