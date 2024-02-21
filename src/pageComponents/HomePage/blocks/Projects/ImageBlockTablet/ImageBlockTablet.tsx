import ReactPlayer from 'react-player';

import clsx from 'clsx';
import Image from 'next/image';

import { BASE_URL } from '~constants/BASE_URL';

import s from './ImageBlockTablet.module.scss';

interface ImageArrayProps {
	id?: string;
	image: string;
}

interface ImageBlockTabletProps {
	imagesArray: ImageArrayProps[];
	width: number;
	position: number;
}

export function ImageBlockTablet({ imagesArray, width, position }: ImageBlockTabletProps) {
	const addUrl = process.env.NODE_ENV === 'development' ? `${BASE_URL}` : '';

	return (
		<div className={s.swipable}>
			{imagesArray.map((image, index) => {
				const borderImageClassName = position + 1 !== index ? s.img : clsx(s.img, s.active);
				return (
					<div key={index} className={borderImageClassName}>
						{image.id === 'video' ? (
							<ReactPlayer
								key={image.image}
								light
								url={image.image}
								width={width}
								height="100%"
								playing={true}
							/>
						) : (
							<Image
								key={image.image}
								src={`${addUrl}${image.image}`}
								alt=" "
								width={width}
								height={94}
								style={{ objectFit: 'cover', height: '100%' }}
								draggable="false"
								onMouseDown={(e) => e.preventDefault()}
							/>
						)}
					</div>
				);
			})}
		</div>
	);
}
