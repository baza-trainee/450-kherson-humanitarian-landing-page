import { Arrow } from '~components/Arrow/Arrow';

import s from './Arrows.module.scss';

interface ArrowsProps {
	loaded: boolean;
	onPrevClick: () => void;
	onNextClick: () => void;
	isPrevDisabled: boolean;
	isNextDisabled: boolean;
}

function ArrowKeenSlider(props: { disabled: boolean; left?: boolean; onClick: (e: React.SyntheticEvent) => void }) {
	const direction = props.left ? true : false;
	return <Arrow direction={direction} onClick={props.onClick} disabled={props.disabled} className={s.arrow} />;
}

export function Arrows({ loaded, onPrevClick, onNextClick, isPrevDisabled, isNextDisabled }: ArrowsProps) {
	return (
		loaded && (
			<div className={s.arrowsContainer}>
				<div className={s.arrows}>
					<ArrowKeenSlider left onClick={onPrevClick} disabled={isPrevDisabled} />
					<ArrowKeenSlider onClick={onNextClick} disabled={isNextDisabled} />
				</div>
			</div>
		)
	);
}
