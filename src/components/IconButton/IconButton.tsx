import type { SyntheticEvent } from 'react';

import clsx from 'clsx';

import { Icon } from '~components/Icon/Icon';
import type { ComponentSizes } from '~components/types/ComponentSize';

import s from './IconButton.module.scss';

interface IconButtonProps {
	type?: 'primary' | 'secondary';
	disabled?: boolean;
	icon: string;
	className?: string;
	onClick: (e: SyntheticEvent) => void;
	size?: ComponentSizes;
}

export function IconButton({ type = 'primary', disabled, icon, className, onClick, size }: IconButtonProps) {
	const componentClass = type && s[type];
	return (
		<button className={clsx(s.button, className, componentClass)} onClick={onClick} disabled={disabled}>
			<Icon className={s.icon} icon={`icon--${icon}`} size={size} />
		</button>
	);
}
