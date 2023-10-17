import { useRef, useState } from 'react';
import type { FieldValues } from 'react-hook-form';

import Image from 'next/image';

import { Icon } from '~components/Icon/Icon';

import s from './ImgUpload.module.scss';
interface ImgUploadProps {
	register?: FieldValues;
}

export function ImgUpload({ register }: ImgUploadProps) {
	const [image, setImage] = useState<string>('');
	const fileClick = useRef<HTMLInputElement>(null);

	const changeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			setImage(URL.createObjectURL(event.target.files[0]));
		}
	};

	const handleClick = () => {
		if (fileClick.current !== null) {
			fileClick.current.click();
		}
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
			<label>
				<div className={s.iconBlock}>
					<Icon icon="icon--upload" className={s.icon} onClick={handleClick} />
				</div>
				<input
					type="file"
					className={s.hidden}
					ref={fileClick}
					onChange={changeFile}
					accept="image/*, .png, .jpeg, .web"
					{...register}
				/>
			</label>
		</div>
	);
}
