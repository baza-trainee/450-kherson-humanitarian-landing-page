import { useCallback, useRef, useState } from 'react';

import type { MotionProps } from 'framer-motion';

import { cardsData } from '~/pageComponents/HomePage/defaultData/projectsContent';
import type { Projects } from '~api/types/projects/Projects';
import { Carousel } from '~components/Carousel/Carousel';
import { Dots } from '~components/Dots/Dots';
import { useHandleDrag } from '~hooks/useHandleDrag';
import { useHandleResize } from '~hooks/useHandleResize';

import { ImageBlockMobile } from '../ImageBlockMobile/ImageBlockMobile';

import s from './CarouselScreenMobile.module.scss';

interface CarouselScreenMobileProps {
	arrayIndex: number;
	projects?: Projects;
}

export function CarouselScreenMobile({ arrayIndex, projects }: CarouselScreenMobileProps) {
	const [position, setPosition] = useState(0);
	const [width, setWidth] = useState(0);

	const carousel = useRef<HTMLDivElement>(null);

	const visibleItems = 1;

	const description = (projects || cardsData)[arrayIndex];
	const imagesArray =
		description.videoLink !== ' '
			? [...description.pictures, { image: description.videoLink, id: 'video' }]
			: [...description.pictures];

	const handleResize = () => {
		if (carousel.current?.offsetWidth) {
			setWidth(carousel.current.offsetWidth / visibleItems);
		}
	};

	useHandleResize(handleResize);

	const onRight = () => {
		if (position < imagesArray.length - 1 && position !== imagesArray.length - visibleItems) {
			setPosition(position + 1);
		}
	};
	const onLeft = () => {
		if (position > 0) {
			setPosition(position - 1);
		}
	};

	const paginateTo = useCallback((index: number) => {
		setPosition(index);
	}, []);

	const { handleDragEnd, handleDragStart } = useHandleDrag({
		callbackRight: onRight,
		callbackLeft: onLeft,
	});

	const animation: MotionProps = {
		initial: { scale: 0 },
		animate: {
			left: `${position * (-width - 16)}px`,
			scale: 1,
		},
		drag: 'x',
		dragConstraints: { left: 0, right: 0 },
		dragElastic: 0.2,
	};

	return (
		<div className={s.singleCarousel}>
			<Carousel
				ref={carousel}
				animation={animation}
				handleDragEnd={handleDragEnd}
				handleDragStart={handleDragStart}
				className={s.smallCarousel}
			>
				<ImageBlockMobile imagesArray={imagesArray} width={width} />
			</Carousel>
			<div className={s.dots}>
				<Dots items={imagesArray} activeIndex={position} paginateTo={paginateTo} />
			</div>
		</div>
	);
}
