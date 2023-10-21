import { forwardRef, useEffect, useState } from 'react';
import type { FieldValues } from 'react-hook-form';

import Image from 'next/image';

import { Icon } from '~components/Icon/Icon';
import { BASE_URL } from '~constants/BASE_URL';

import s from './ImgUpload.module.scss';

export type ImgUploadElement = HTMLInputElement;

interface ImgUploadProps {
	register?: FieldValues;
	watch?: (name: string) => FieldValues;
	error?: string;
}

export const ImgUpload = forwardRef<ImgUploadElement, ImgUploadProps>(
	({ register, watch, error }, ref) => {
		const [image, setImage] = useState<string>('');

		const file = watch ? watch(register ? register.name : null) : null;

		useEffect(() => {
			if (watch && file) {
				if (typeof file === 'string') {
					const imgUrl = process.env.NODE_ENV === 'development' ? `${BASE_URL}${file}` : file;
					setImage(imgUrl);
				} else setImage(URL.createObjectURL(file[0]));
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [file]);

		const borderStyle = !image
			? { border: '1px solid var(--color--secondary-2)' }
			: { border: 'none' };

		return (
			<div className={s.ImgUpload}>
				<div
					className={s.imgBlock}
					style={error ? { border: '1px solid var(--color--error-1)' } : borderStyle}
				>
					<Image
						priority={true}
						src={!image ? '/svg/blank-img.svg' : image}
						alt="hero-img"
						width={!image ? 100 : 712}
						height={!image ? 100 : 300}
						className={!image ? s.imgDefault : s.img}
					/>
				</div>
				<label>
					<div className={s.iconBlock}>
						<Icon icon="icon--upload" className={s.icon} />
					</div>
					<input
						type="file"
						className={s.hidden}
						ref={ref}
						accept="image/*, .png, .jpeg, .web"
						{...register}
					/>
				</label>
			</div>
		);
	},
);
ImgUpload.displayName = 'ImgUpload';
