import { Arrow } from '~components/Arrow/Arrow';

import s from './Arrows.module.scss';

interface ArrowsProps {
	loaded: boolean;
	onPrevClick: () => void;
	onNextClick: () => void;
}

function ArrowKeenSlider(props: { direction: 'left' | 'right'; onClick: (e: React.SyntheticEvent) => void }) {
	return <Arrow direction={props.direction} onClick={props.onClick} className={s.arrow} />;
}

export function Arrows({ loaded, onPrevClick, onNextClick }: ArrowsProps) {
	return (
		loaded && (
			<div className={s.arrowsContainer}>
				<div className={s.arrows}>
					<ArrowKeenSlider direction="left" onClick={onPrevClick} />
					<ArrowKeenSlider direction="right" onClick={onNextClick} />
				</div>
			</div>
		)
	);
}
