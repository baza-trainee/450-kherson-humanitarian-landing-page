import { forwardRef } from 'react';

import clsx from 'clsx';
import Link from 'next/link';

import { Text } from '~components/Text/Text';

import s from './Button.module.scss';

type ButtonLinkElement = HTMLElementTagNameMap['a'];
interface ButtonLinkProps extends React.HTMLAttributes<ButtonLinkElement> {
	type?: 'primary' | 'secondary';
	href: string;
}

export const ButtonLink = forwardRef<ButtonLinkElement, ButtonLinkProps>(
	({ type = 'primary', children, className, href, ...rest }, ref) => {
		const componentClass = [type && s[type]];

		const handleClick = () => {
			const targetElement = document.getElementById(href?.slice(1));

			if (targetElement) {
				targetElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
			}
		};

		return (
			<Link
				href={href}
				scroll={false}
				onClick={handleClick}
				className={clsx(s.Button, className, componentClass)}
				ref={ref}
				{...rest}
			>
				<Text variant="button" className={s.label}>
					{children}
				</Text>
			</Link>
		);
	},
);

ButtonLink.displayName = 'ButtonLink';
