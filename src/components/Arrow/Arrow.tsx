import type { SyntheticEvent } from 'react';

import clsx from 'clsx';

import { Icon } from '~components/Icon/Icon';

import s from './Arrow.module.scss';
interface ArrowProps {
	disabled?: boolean;
	direction: 'left' | 'right';
	className: string;
	onClick: (e: SyntheticEvent) => void;
}

export function Arrow({ disabled, direction, className, onClick }: ArrowProps) {
	return (
		<button className={clsx(s.button, className)} onClick={onClick} disabled={disabled}>
			<Icon className={s.icon} icon={`icon--arrow-${direction}`} />
		</button>
	);
}
