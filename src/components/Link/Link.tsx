import { forwardRef } from 'react';

import clsx from 'clsx';
import Link from 'next/link';

import type { TextVariants } from '~components/Text/Text';
import { Text } from '~components/Text/Text';

import s from './Link.module.scss';
interface LinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
	variant: TextVariants;
	href: string;
}

export const CustomLink = forwardRef<HTMLAnchorElement, LinkProps>(
	({ variant, children, className, href, ...rest }, ref) => {
		return (
			<Link href={href} scroll={false} className={clsx(className, s.link)} ref={ref} {...rest}>
				<Text variant={variant}>{children}</Text>
			</Link>
		);
	},
);

CustomLink.displayName = 'CustomLink';
