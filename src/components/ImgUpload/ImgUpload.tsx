import { useRef, useState } from 'react';

import Image from 'next/image';

import { Icon } from '~components/Icon/Icon';

import s from './ImgUpload.module.scss';

export function ImgUpload() {
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
	};

	return (
		<div className={s.ImgUpload}>
			<div className={s.imgBlock}>
				{!image ?
					<Image
						priority={true}
						src={'/svg/blank-img.svg'}
						alt='card-img'
						width={100}
						height={100}
						className={s.imgDefault}
					/>
					:
					<Image
						src={image}
						alt='card-img'
						fill={true}
						className={s.img}
					/>}
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
