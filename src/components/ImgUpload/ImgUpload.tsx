import Image from 'next/image';

import s from './ImgUpload.module.scss';

export function ImgUpload() {
	return (
		<div className={s.ImgUpload}>
			<div className={s.imgBlock}>
				<Image
					src='/svg/blank-img.svg'
					alt='card-img'
					width={100}
					height={100}
					className={s.img}
				/>
			</div>
			<label>
				<input type='file' />
			</label>
		</div>
	);
}
