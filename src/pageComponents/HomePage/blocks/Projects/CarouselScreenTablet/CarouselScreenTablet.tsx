import { useEffect, useRef, useState } from 'react';

import type { MotionProps } from 'framer-motion';

import { cardsData } from '~/pageComponents/HomePage/defaultData/projectsContent';
import type { Projects } from '~api/types/projects/Projects';
import { Carousel } from '~components/Carousel/Carousel';
import { IconButton } from '~components/IconButton/IconButton';
import { useHandleDrag } from '~hooks/useHandleDrag';

import ActiveImageTablet from '../ActiveImageTablet/ActiveImageTablet';
import { ImageBlockTablet } from '../ImageBlockTablet/ImageBlockTablet';

import s from './CarouselScreenTablet.module.scss';

interface CarouselScreenTabletProps {
	arrayIndex: number;
	projects?: Projects;
}

export function CarouselScreenTablet({ arrayIndex, projects }: CarouselScreenTabletProps) {
	const [positionMini, setPositionMini] = useState(0);
	const [widthMini, setWidthMini] = useState(0);

	const carouselMini = useRef<HTMLDivElement>(null);
	const visibleItems = 3;
	const gap = 16;
	const widthWithGap = (gap * 2) / visibleItems;

	const description = (projects || cardsData)[arrayIndex];
	const imagesArray =
		description.videoLink !== ' '
			? [...description.pictures, { image: description.videoLink, id: 'video' }]
			: [...description.pictures];

	const onRight = () => {
		if (
			positionMini < imagesArray.length - 1 &&
			positionMini !== imagesArray.length - visibleItems + 1
		) {
			setPositionMini(positionMini + 1);
		}
	};
	const onLeft = () => {
		if (positionMini > -1) {
			setPositionMini(positionMini - 1);
		}
	};

	const { handleDragEnd, handleDragStart } = useHandleDrag({
		callbackRight: onRight,
		callbackLeft: onLeft,
	});

	const animationMini: MotionProps = {
		initial: { scale: 0 },
		animate: {
			left: `${positionMini * (-widthMini - gap)}px`,
			scale: 1,
		},
		drag: 'x',
		dragConstraints: { left: 0, right: 0 },
		dragElastic: 0.2,
	};

	useEffect(() => {
		if (carouselMini.current) {
			setWidthMini(carouselMini.current.offsetWidth / visibleItems - widthWithGap);
		}
	}, [widthWithGap]);

	return (
		<div className={s.imageContent}>
			<ActiveImageTablet imagesArray={imagesArray} position={positionMini} />
			<div className={s.container}>
				<IconButton
					type="secondary"
					icon="icon--arrow-left"
					onClick={onLeft}
					disabled={positionMini === -1}
				/>
				<Carousel
					ref={carouselMini}
					animation={animationMini}
					handleDragEnd={handleDragEnd}
					handleDragStart={handleDragStart}
					className={s.smallCarousel}
				>
					<ImageBlockTablet
						imagesArray={imagesArray}
						width={widthMini}
						position={positionMini}
					/>
				</Carousel>
				<IconButton
					type="secondary"
					icon="icon--arrow-right"
					onClick={onRight}
					disabled={positionMini === imagesArray.length - visibleItems + 1}
				/>
			</div>
		</div>
	);
}
