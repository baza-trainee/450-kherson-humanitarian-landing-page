import Image from 'next/image';

import { Icon } from '~components/Icon/Icon';

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
			<div className={s.iconBlock}>
				<Icon icon="icon--upload" className={s.icon} /> {/*onClick={}*/}
				<Icon icon="icon--trash" className={s.icon} />
			</div>

			{/* <label>
				<input type='file' />
			</label> */}
		</div>
	);
}
