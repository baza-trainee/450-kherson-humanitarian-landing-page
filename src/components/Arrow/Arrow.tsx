import type { SyntheticEvent } from 'react';

import { Icon } from '~components/Icon/Icon';

interface ArrowProps {
	disabled?: boolean;
	left?: boolean;
	className: string;
	onClick: (e: SyntheticEvent) => void;
}

export function Arrow({ disabled, left, className, onClick }: ArrowProps) {
	return (
		<button className={className}>
			{left && (
				<Icon
					icon="icon--arrow-left"
					colors={{ default: 'var(--color--primary-3)' }}
					onClick={onClick}
					disabled={disabled}
				></Icon>
			)}
			{!left && (
				<Icon
					icon="icon--arrow-right"
					colors={{ default: 'var(--color--primary-3)' }}
					onClick={onClick}
					disabled={disabled}
				></Icon>
			)}
		</button>
	);
}
