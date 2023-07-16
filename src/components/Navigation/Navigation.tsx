import clsx from 'clsx';

import { CustomLink } from '~components/Link/Link';
import { Text } from '~components/Text/Text';

import s from './Navigation.module.scss';
interface NavigationProps {
	variant: 'header' | 'footer';
	flexDirection?: 'column' | 'rowHeader' | 'rowFooter';
	className: string;
}

export function Navigation({ variant, className, flexDirection }: NavigationProps) {
	const navigation = [
		{ id: 1, href: '#AboutUs', name: 'Про нас' },
		{ id: 2, href: '#OurActivity', name: 'Наша діяльність' },
		{ id: 3, href: '#Projects', name: 'Проєкти' },
		{ id: 4, href: '#OurPartners', name: 'Наші партнери' },
	];
	return (
		<ul className={clsx(s.navigation, flexDirection && s[flexDirection])}>
			{navigation.length ? (
				navigation.map(({ id, name, href }) => (
					<li className={clsx(s.navigationItem, className)} key={id}>
						<CustomLink href={href} variant={variant} className={s.link}>
							{name}
						</CustomLink>
					</li>
				))
			) : (
				<Text variant="header">Navigation</Text>
			)}
		</ul>
	);
}
