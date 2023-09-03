import Image from 'next/image';

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
