import { forwardRef, useEffect, useRef, useState } from 'react';
import type { FieldValues } from 'react-hook-form';

import Image from 'next/image';

import { Icon } from '~components/Icon/Icon';

import s from './ImgUpload.module.scss';

export type ImgUploadElement = HTMLInputElement;

interface ImgUploadProps {
	register?: FieldValues;
	watch?: (name: string) => FieldValues;
}

export const ImgUpload = forwardRef<ImgUploadElement, ImgUploadProps>(({ register, watch }, ref) => {
	const [image, setImage] = useState<string>('');

	const files = watch ? watch(register ? register.name : null) : null;

	useEffect(() => {
		if (watch && files) {
			if (typeof files === 'string') {
				setImage(files);
			} else setImage(URL.createObjectURL(files[0]));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [files]);

	return (
		<div className={s.ImgUpload}>
			<div
				className={s.imgBlock}
				style={!image ? { border: '1px solid var(--color--secondary-2)' } : { border: 'none' }}
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
				<input type="file" className={s.hidden} ref={ref} accept="image/*, .png, .jpeg, .web" {...register} />
			</label>
		</div>
	);
});
ImgUpload.displayName = 'ImgUpload';
