import type React from 'react';

import clsx from 'clsx';

import { CustomLink } from '~components/Link/Link';

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
	variant:
		| 'h1'
		| 'h2'
		| 'h3'
		| 'h4'
		| 'h5'
		| 'h6'
		| 'subtitle'
		| 'p'
		| 'button'
		| 'header'
		| 'footer'
		| 'various1'
		| 'various2'
		| 'various3';
	download?: boolean;
	target?: '_blank';
}

export const NavigationList: React.FC<NavigationListProps> = ({
	onClick,
	navigation,
	navStyle,
	linkStyle,
	variant,
	download,
	target,
}) => {
	return (
		<ul className={clsx(s.navigation, navStyle)}>
			{navigation.map(({ id, name, href }) => (
				<li className={s.navigationItem} key={id}>
					<CustomLink
						className={linkStyle}
						href={href}
						target={target}
						download={download}
						variant={variant}
						onClick={onClick}
					>
						{name}
					</CustomLink>
				</li>
			))}
		</ul>
	);
};
