import { forwardRef } from 'react';

import type { MotionProps, PanInfo } from 'framer-motion';
import { motion } from 'framer-motion';

import s from './Carousel.module.scss';

export type CarouselElement = HTMLDivElement;

export interface CarouselProps extends Omit<ReactHTMLElementAttributes<CarouselElement>, 'ref'> {
	animation: MotionProps;
	handleDrag: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
}

export const Carousel = forwardRef<CarouselElement, CarouselProps>(({ children, animation, handleDrag }, ref) => {
	return (
		<div ref={ref} className={s.carousel}>
			<motion.div
				className={s.row}
				{...animation}
				onDragStart={(e) => ((e.target as HTMLDivElement).style.cursor = 'grabbing')}
				onDragEnd={handleDrag}
			>
				{children}
			</motion.div>
		</div>
	);
});

Carousel.displayName = 'Carousel';
