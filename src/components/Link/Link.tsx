import { forwardRef } from 'react';

import clsx from 'clsx';
import Link from 'next/link';

import { Text } from '~components/Text/Text';

import s from './Link.module.scss';

type LinkElement = HTMLElementTagNameMap['a'];
interface LinkProps extends React.HTMLAttributes<LinkElement> {
	variant: 'header' | 'footer';
	href: string;
}

export const CustomLink = forwardRef<LinkElement, LinkProps>(({ variant, children, className, href, ...rest }, ref) => {
	return (
		<Link href={href} scroll={false} className={clsx(className, s.link)} ref={ref} {...rest}>
			<Text variant={variant}>{children}</Text>
		</Link>
	);
});

CustomLink.displayName = 'CustomLink';
