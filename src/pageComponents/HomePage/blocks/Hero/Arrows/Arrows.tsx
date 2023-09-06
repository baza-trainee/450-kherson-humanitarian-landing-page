import { Arrow } from '~components/Arrow/Arrow';

import s from './Arrows.module.scss';

interface ArrowsProps {
	loaded: boolean;
	onPrevClick: () => void;
	onNextClick: () => void;
}

function ArrowKeenSlider(props: { left?: boolean; onClick: (e: React.SyntheticEvent) => void }) {
	const direction = props.left ? true : false;
	return <Arrow direction={direction} onClick={props.onClick} className={s.arrow} />;
}

export function Arrows({ loaded, onPrevClick, onNextClick }: ArrowsProps) {
	return (
		loaded && (
			<div className={s.arrowsContainer}>
				<div className={s.arrows}>
					<ArrowKeenSlider left onClick={onPrevClick} />
					<ArrowKeenSlider onClick={onNextClick} />
				</div>
			</div>
		)
	);
}
