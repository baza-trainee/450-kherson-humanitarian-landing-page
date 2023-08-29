import clsx from 'clsx';

import s from './Dots.module.scss';

interface DotsProps {
	currentSlide: number;
	slidesCount: number;
	loaded: boolean;
	onDotClick: (idx: number) => void;
}

export function Dots({ currentSlide, slidesCount, loaded, onDotClick }: DotsProps) {
	return (
		loaded && (
			<div className={s.dots}>
				{[...Array(slidesCount).keys()].map((idx) => {
					return (
						<button
							key={idx}
							onClick={() => onDotClick(idx)}
							className={clsx(s.dot, currentSlide === idx ? `${s.active}` : '')}
						/>
					);
				})}
			</div>
		)
	);
}
