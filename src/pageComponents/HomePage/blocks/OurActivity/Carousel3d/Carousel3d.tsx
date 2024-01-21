import { type ReactNode } from 'react';

import type { MotionProps } from 'framer-motion';
import { AnimatePresence, motion } from 'framer-motion';
import type { StaticImageData } from 'next/image';

import { useHandleDrag } from '~hooks/useHandleDrag';

import s from './Carousel3d.module.scss';

interface CardData {
	id?: string;
	image: string | StaticImageData;
	title?: string;
	text?: string;
}

interface SliderProps {
	className: string;
	renderContent: (image: string | StaticImageData, title?: string, text?: string) => ReactNode;
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
	const getImageIndex = (item: string | StaticImageData) => {
		switch (item) {
			case visibleIndices[0].image:
				return 'left';
			case visibleIndices[1].image:
				return 'center';
			case visibleIndices[2].image:
				return 'right';
			default:
				return 'right';
		}
	};

	const { handleDragEnd, handleDragStart } = useHandleDrag({
		callbackRight: () => paginate(1),
		callbackLeft: () => paginate(-1),
	});

	return (
		<div className={className}>
			<AnimatePresence mode="popLayout" custom={direction} initial={false}>
				{visibleIndices.map((card) => {
					const { id, image, title, text } = card;
					return (
						<motion.div
							key={id}
							className={s.cardWrapper}
							layout
							custom={{
								slidePosition: getImageIndex(image),
								direction,
								...screens,
							}}
							{...animate}
							onDragStart={handleDragStart}
							onDragEnd={handleDragEnd}
						>
							{renderContent(image, title, text)}
						</motion.div>
					);
				})}
			</AnimatePresence>
		</div>
	);
}
