import Image from 'next/image';

import s from './ImageBlockMobile.module.scss';

interface ImageBlockProps {
	imagesArray: {
		src: string;
	}[];
	width: number;
}

export function ImageBlockMobile({ imagesArray, width }: ImageBlockProps) {
	return (
		<div className={s.swipable}>
			{imagesArray.map((image) => {
				return (
					<div className={s.container} key={image.src} style={{ width: `${width}px` }}>
						<Image
							src={image.src}
							alt=" "
							width={width}
							height={253}
							className={s.img}
							style={{ objectFit: 'cover' }}
						/>
					</div>
				);
			})}
		</div>
	);
}
