import { forwardRef } from 'react';

import clsx from 'clsx';
import Link from 'next/link';

import { Text } from '~components/Text/Text';

import s from './Button.module.scss';

export interface ButtonLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
	type?: 'primary' | 'secondary';
	href: string;
}

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
	({ type = 'primary', children, className, href, ...rest }, ref) => {
		const componentClass = [type && s[type]];

		return (
			<Link href={href} scroll={false} className={clsx(s.Button, className, componentClass)} ref={ref} {...rest}>
				<Text variant="button" className={s.label}>
					{children}
				</Text>
			</Link>
		);
	},
);

ButtonLink.displayName = 'ButtonLink';
