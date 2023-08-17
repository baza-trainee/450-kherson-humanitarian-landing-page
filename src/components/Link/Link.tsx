import { forwardRef } from 'react';

import clsx from 'clsx';
import Link from 'next/link';

import { Text } from '~components/Text/Text';

import s from './Link.module.scss';

type LinkElement = HTMLElementTagNameMap['a'];
interface LinkProps extends React.HTMLAttributes<LinkElement> {
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
	href: string;
	download?: boolean;
	target?: '_blank';
}

export const CustomLink = forwardRef<LinkElement, LinkProps>(
	({ download, target, variant, children, className, href, ...rest }, ref) => {
		return (
			<Link
				href={href}
				scroll={false}
				target={target}
				className={clsx(className, s.link)}
				download={download}
				ref={ref}
				{...rest}
			>
				<Text variant={variant}>{children}</Text>
			</Link>
		);
	},
);

CustomLink.displayName = 'CustomLink';
