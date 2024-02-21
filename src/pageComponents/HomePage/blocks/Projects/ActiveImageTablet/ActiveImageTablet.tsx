import Image from 'next/image';

import { BASE_URL } from '~constants/BASE_URL';
interface ImageArrayProps {
	id?: string;
	image: string;
}
interface ActiveImageTabletProps {
	imagesArray: ImageArrayProps[];
	position: number;
}

export default function ActiveImageTablet({ imagesArray, position }: ActiveImageTabletProps) {
	const addUrl = process.env.NODE_ENV === 'development' ? `${BASE_URL}` : '';

	return (
		<>
			{imagesArray.map((image, index) => {
				if (position + 1 === index) {
					return image.id === 'video' ? (
						<iframe
							key={image.image}
							width="600"
							height="432"
							src={image.image}
							title="YouTube video player"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							allowFullScreen
						/>
					) : (
						<Image
							key={image.image}
							src={`${addUrl}${image.image}`}
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
