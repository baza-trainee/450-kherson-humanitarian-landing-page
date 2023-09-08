import { useRef, useState } from 'react';

import clsx from 'clsx';
import Image from 'next/image';

import { Icon } from '~components/Icon/Icon';

import s from './ImgUpload.module.scss';
interface ImgUploadProps{
	shadowValue: string;
}
export function ImgUpload({shadowValue}: ImgUploadProps) {
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

	const clearFile = () => {
		setImage('');
		if (fileClick.current !== null) {
			fileClick.current.value = '';
		}
	};

	return (
		<div className={s.ImgUpload}>
			<div className={s.imgBlock}>
				<Image
					priority={true}
					src={!image ? '/svg/blank-img.svg' : image}
					alt='card-img'
					width={!image ? 100 : 712}
					height={!image ? 100 : 300}
					className={!image ? s.imgDefault: s.img}
				/>
				<div className={clsx(s.ImgShadow, s[shadowValue])}/>
			</div>
			<div className={s.iconBlock}>
				<Icon icon="icon--upload" className={s.icon} onClick={handleClick} />
				<Icon icon="icon--trash" className={s.icon} onClick={clearFile} />
			</div>
			<label>
				<input type='file' className={s.hidden} ref={fileClick} onChange={changeFile} accept='image/*, .png, .jpeg, .web' />
			</label>
		</div>
	);
}
