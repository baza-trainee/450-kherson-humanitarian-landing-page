import ReactPlayer from 'react-player';

import clsx from 'clsx';
import Image from 'next/image';

import s from './ImageBlockTablet.module.scss';

interface ImageBlockTabletProps {
	imagesArray: {
		src: string;
		type: string;
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
					<div key={index} className={borderImageClassName}>
						{image.type === 'video' ? (
							<ReactPlayer key={image.src} light url={image.src} width={width} height="100%" playing={true} />
						) : (
							<Image
								key={image.src}
								src={image.src}
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
