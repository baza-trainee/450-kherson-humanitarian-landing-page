import { type ReactNode } from 'react';

import type { MotionProps } from 'framer-motion';
import { AnimatePresence, motion } from 'framer-motion';

import { useHandleDrag } from '~hooks/useHandleDrag';

import s from './Carousel3d.module.scss';

interface CardData {
	src: string;
	title?: string;
	text?: string;
}

interface SliderProps {
	className: string;
	renderContent: (src: string, title?: string, text?: string) => ReactNode;
	animate: MotionProps;
	screens?: Record<string, boolean>;
	paginate: (dir: number) => void;
	direction: number;
	visibleIndices: CardData[];
}

export function Carousel3d({
	className,
	renderContent,
	animate,
	screens,
	paginate,
	direction,
	visibleIndices,
}: SliderProps) {
	const getImageIndex = (item: string) => {
		switch (item) {
			case visibleIndices[0].src:
				return 'left';
			case visibleIndices[1].src:
				return 'center';
			case visibleIndices[2].src:
				return 'right';
			default:
				return 'right';
		}
	};

	const { handleDragEnd, handleDragStart } = useHandleDrag(
		() => paginate(1),
		() => paginate(-1),
	);

	return (
		<div className={className}>
			<AnimatePresence mode="popLayout" custom={direction} initial={false}>
				{visibleIndices.map((card) => {
					const { src, title, text } = card;
					return (
						<motion.div
							key={src}
							className={s.cardWrapper}
							layout
							custom={{
								slidePosition: getImageIndex(src),
								direction,
								...screens,
							}}
							{...animate}
							onDragStart={handleDragStart}
							onDragEnd={handleDragEnd}
						>
							{renderContent(src, title, text)}
						</motion.div>
					);
				})}
			</AnimatePresence>
		</div>
	);
}
