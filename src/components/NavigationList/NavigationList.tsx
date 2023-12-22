import type React from 'react';

import clsx from 'clsx';

import { CustomLink } from '~components/Link/Link';
import type { TextVariants } from '~components/Text/Text';

import s from './NavigationList.module.scss';

interface NavigationItem {
	id: number;
	name: string;
	href: string;
}

interface NavigationListProps {
	onClick?: () => void;
	navigation: NavigationItem[];
	navStyle?: string;
	linkStyle?: string;
	variant: TextVariants;
	download?: boolean;
	target?: '_blank';
}

export const NavigationList: React.FC<NavigationListProps> = ({
	onClick,
	navigation,
	navStyle,
	linkStyle,
	variant,
	target,
	download,
}) => {
	return (
		<ul className={clsx(s.navigation, navStyle)}>
			{navigation.map(({ id, name, href }) => (
				<li className={s.navigationItem} key={id}>
					<CustomLink
						className={linkStyle}
						href={href}
						variant={variant}
						onClick={onClick}
						target={target}
						download={download}
					>
						{name}
					</CustomLink>
				</li>
			))}
		</ul>
	);
};
