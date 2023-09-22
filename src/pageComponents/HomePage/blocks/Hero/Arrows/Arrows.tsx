import { IconButton } from '~components/IconButton/IconButton';

import s from './Arrows.module.scss';

interface ArrowsProps {
	loaded: boolean;
	onPrevClick: () => void;
	onNextClick: () => void;
}

function ArrowKeenSlider(props: {
	type: 'primary' | 'secondary';
	icon: string;
	onClick: (e: React.SyntheticEvent) => void;
}) {
	return <IconButton type={props.type} icon={props.icon} onClick={props.onClick} className={s.arrow} />;
}

export function Arrows({ loaded, onPrevClick, onNextClick }: ArrowsProps) {
	return (
		loaded && (
			<div className={s.arrowsContainer}>
				<div className={s.arrows}>
					<ArrowKeenSlider type="secondary" icon="icon--arrow-left" onClick={onPrevClick} />
					<ArrowKeenSlider type="secondary" icon="icon--arrow-right" onClick={onNextClick} />
				</div>
			</div>
		)
	);
}
