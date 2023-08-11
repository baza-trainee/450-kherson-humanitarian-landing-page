import { type ReactNode } from 'react';

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
	animate: object;
	screens?: Record<string, boolean>;
	paginate: (dir: number) => void;
	direction: number;
	visibleIndices: CardData[];
}

export function Carousel({
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

	const { handleDrag } = useHandleDrag(
		() => paginate(1),
		() => paginate(-1),
	);

	return (
		<>
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
								onDragStart={(e) => ((e.target as HTMLDivElement).style.cursor = 'grabbing')}
								onDragEnd={handleDrag}
							>
								{renderContent(src, title, text)}
							</motion.div>
						);
					})}
				</AnimatePresence>
			</div>
		</>
	);
}
