import { useState } from 'react';
import ReactPlayer from 'react-player/youtube';

import Image from 'next/image';

import { BASE_URL } from '~constants/BASE_URL';

import s from './ImageBlockMobile.module.scss';

interface ImageArrayProps {
	id?: string;
	image: string;
}

interface ImageBlockProps {
	imagesArray: ImageArrayProps[];
	width: number;
}

export function ImageBlockMobile({ imagesArray, width }: ImageBlockProps) {
	const [isVideoPlaying, setIsVideoPlaying] = useState(true);

	const addUrl = process.env.NODE_ENV === 'development' ? `${BASE_URL}` : '';

	const handleVideoPlay = () => {
		setIsVideoPlaying(false);
	};

	const handleVideoPause = () => {
		setIsVideoPlaying(true);
	};
	return (
		<div className={s.swipable}>
			{imagesArray.map((image) => {
				return (
					<div className={s.container} key={image.image} style={{ width: `${width}px` }}>
						{image.id === 'video' ? (
							<ReactPlayer
								light={isVideoPlaying}
								url={image.image}
								width={width}
								height="253"
								playing={true}
								onPlay={handleVideoPlay}
								onPause={handleVideoPause}
							/>
						) : (
							<Image
								src={`${addUrl}${image.image}`}
								alt=" "
								width={width}
								height={253}
								className={s.img}
								style={{ objectFit: 'cover' }}
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
