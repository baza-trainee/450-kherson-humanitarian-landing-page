import { useCallback, useRef, useState } from 'react';

import type { MotionProps } from 'framer-motion';

import { cardsData } from '~/data/projectsContent';
import { Carousel } from '~components/Carousel/Carousel';
import { Dots } from '~components/Dots/Dots';
import { useHandleDrag } from '~hooks/useHandleDrag';
import { useHandleResize } from '~hooks/useHandleResize';

import { ImageBlockMobile } from '../ImageBlockMobile/ImageBlockMobile';

import s from './CarouselScreenMobile.module.scss';

interface CarouselScreenMobileProps {
	arrayIndex: number;
}

export function CarouselScreenMobile({ arrayIndex }: CarouselScreenMobileProps) {
	const [position, setPosition] = useState(0);
	const [width, setWidth] = useState(0);

	const carousel = useRef<HTMLDivElement>(null);

	const visibleItems = 1;

	const { description } = cardsData[arrayIndex];

	const handleResize = () => {
		if (carousel.current?.offsetWidth) {
			setWidth(carousel.current.offsetWidth / visibleItems);
		}
	};

	useHandleResize(handleResize);

	const onRight = () => {
		if (position < description.images.length - 1 && position !== description.images.length - visibleItems) {
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
		transition: {
			type: 'spring',
			stiffness: 260,
			damping: 20,
		},
		drag: 'x',
		dragConstraints: { left: 0, right: 0 },
		dragElastic: 0.7,
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
				<ImageBlockMobile imagesArray={description.images} width={width} />
			</Carousel>
			<div className={s.dots}>
				<Dots items={description.images} activeIndex={position} paginateTo={paginateTo} />
			</div>
		</div>
	);
}
