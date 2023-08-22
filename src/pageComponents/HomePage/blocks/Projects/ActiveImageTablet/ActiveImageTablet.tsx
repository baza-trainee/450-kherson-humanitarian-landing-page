import Image from 'next/image';

import s from './ActiveImageTablet.module.scss';

interface ActiveImageTabletProps {
	imagesArray: {
		src: string;
	}[];
	position: number;
}

export default function ActiveImageTablet({ imagesArray, position }: ActiveImageTabletProps) {
	return (
		<>
			{imagesArray.map((image, index) => {
				if (position + 1 === index) {
					return (
						<Image
							key={image.src}
							className={s.mainImage}
							src={image.src}
							alt="image1"
							width={600}
							height={432}
							style={{ objectFit: 'cover' }}
						/>
					);
				}
			})}
		</>
	);
}
