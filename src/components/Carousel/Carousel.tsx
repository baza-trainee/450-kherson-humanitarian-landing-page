import { forwardRef } from 'react';

import clsx from 'clsx';
import type { MotionProps, PanInfo } from 'framer-motion';
import { motion } from 'framer-motion';

import s from './Carousel.module.scss';

export type CarouselElement = HTMLDivElement;

export interface CarouselProps extends Omit<ReactHTMLElementAttributes<CarouselElement>, 'ref'> {
	animation: MotionProps;
	handleDragEnd: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
	handleDragStart: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
}

export const Carousel = forwardRef<CarouselElement, CarouselProps>(
	({ children, animation, handleDragEnd, handleDragStart, className }, ref) => {
		return (
			<div ref={ref} className={clsx(s.carousel, className)}>
				<motion.div className={s.row} {...animation} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
					{children}
				</motion.div>
			</div>
		);
	},
);

Carousel.displayName = 'Carousel';
