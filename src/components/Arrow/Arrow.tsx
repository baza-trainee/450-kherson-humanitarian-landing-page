import type { SyntheticEvent } from 'react';

import clsx from 'clsx';

import { Icon } from '~components/Icon/Icon';

import s from './Arrow.module.scss';

interface ArrowProps {
	type?: 'primary' | 'secondary';
	disabled?: boolean;
	direction: 'left' | 'right';
	className?: string;
	onClick: (e: SyntheticEvent) => void;
}

export function Arrow({ type = 'primary', disabled, direction, className, onClick }: ArrowProps) {
	const componentClass = type && s[type];
	return (
		<button className={clsx(s.button, className, componentClass)} onClick={onClick} disabled={disabled}>
			<Icon className={s.icon} icon={`icon--arrow-${direction}`} />
		</button>
	);
}
