import type { SyntheticEvent } from 'react';

import { Icon } from '~components/Icon/Icon';

interface ArrowProps {
	disabled?: boolean;
	direction?: boolean;
	className: string;
	onClick: (e: SyntheticEvent) => void;
}

export function Arrow({ disabled, direction, className, onClick }: ArrowProps) {
	return (
		<button className={className}>
			<Icon
				icon={direction ? 'icon--arrow-left' : 'icon--arrow-right'}
				colors={{ default: 'var(--color--primary-3)' }}
				onClick={onClick}
				disabled={disabled}
			/>
		</button>
	);
}
