import Image from 'next/image';

interface ActiveImageTabletProps {
	imagesArray: {
		src: string;
		type: string;
	}[];
	position: number;
}

export default function ActiveImageTablet({ imagesArray, position }: ActiveImageTabletProps) {
	return (
		<>
			{imagesArray.map((image, index) => {
				if (position + 1 === index) {
					return image.type === 'video' ? (
						<iframe
							key={image.src}
							width="600"
							height="432"
							src={image.src}
							title="YouTube video player"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							allowFullScreen
						/>
					) : (
						<Image
							key={image.src}
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
