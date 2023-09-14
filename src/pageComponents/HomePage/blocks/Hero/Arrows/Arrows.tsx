import { Arrow } from '~components/Arrow/Arrow';

import s from './Arrows.module.scss';

interface ArrowsProps {
	loaded: boolean;
	onPrevClick: () => void;
	onNextClick: () => void;
	isPrevDisabled: boolean;
	isNextDisabled: boolean;
}

function ArrowKeenSlider(props: {
	disabled: boolean;
	direction: 'left' | 'right';
	onClick: (e: React.SyntheticEvent) => void;
}) {
	return <Arrow direction={props.direction} onClick={props.onClick} disabled={props.disabled} className={s.arrow} />;
}

export function Arrows({ loaded, onPrevClick, onNextClick, isPrevDisabled, isNextDisabled }: ArrowsProps) {
	return (
		loaded && (
			<div className={s.arrowsContainer}>
				<div className={s.arrows}>
					<ArrowKeenSlider direction="left" onClick={onPrevClick} disabled={isPrevDisabled} />
					<ArrowKeenSlider direction="right" onClick={onNextClick} disabled={isNextDisabled} />
				</div>
			</div>
		)
	);
}
