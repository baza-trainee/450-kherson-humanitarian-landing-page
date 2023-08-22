import clsx from 'clsx';
import Image from 'next/image';

import s from './ImageBlockTablet.module.scss';

interface ImageBlockTabletProps {
	imagesArray: {
		src: string;
	}[];
	width: number;
	position: number;
}

export function ImageBlockTablet({ imagesArray, width, position }: ImageBlockTabletProps) {
	return (
		<div className={s.swipable}>
			{imagesArray.map((image, index) => {
				const borderImageClassName = position + 1 !== index ? s.img : clsx(s.img, s.active);
				return (
					<Image
						key={image.src}
						src={image.src}
						alt=" "
						width={width}
						height={94}
						className={borderImageClassName}
						style={{ objectFit: 'cover' }}
					/>
				);
			})}
		</div>
	);
}
