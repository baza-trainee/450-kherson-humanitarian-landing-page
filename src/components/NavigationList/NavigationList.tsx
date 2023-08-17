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
}

export const NavigationList: React.FC<NavigationListProps> = ({
	onClick,
	navigation,
	navStyle,
	linkStyle,
	variant,
}) => {
	return (
		<ul className={clsx(s.navigation, navStyle)}>
			{navigation.map(({ id, name, href }) => (
				<li className={s.navigationItem} key={id}>
					<CustomLink className={linkStyle} href={href} variant={variant} onClick={onClick}>
						{name}
					</CustomLink>
				</li>
			))}
		</ul>
	);
};
