import { useState } from 'react';
import ReactPlayer from 'react-player/youtube';

import Image from 'next/image';

import s from './ImageBlockMobile.module.scss';

interface ImageBlockProps {
	imagesArray: {
		src: string;
		type: string;
	}[];
	width: number;
}

export function ImageBlockMobile({ imagesArray, width }: ImageBlockProps) {
	const [isVideoPlaying, setIsVideoPlaying] = useState(true);

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
					<div className={s.container} key={image.src} style={{ width: `${width}px` }}>
						{image.type === 'video' ? (
							<ReactPlayer
								light={isVideoPlaying}
								url={image.src}
								width={width}
								height="253"
								playing={true}
								onPlay={handleVideoPlay}
								onPause={handleVideoPause}
							/>
						) : (
							<Image
								src={image.src}
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
