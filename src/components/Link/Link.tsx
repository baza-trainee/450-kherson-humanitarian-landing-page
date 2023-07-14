import { forwardRef } from 'react';

import Link from 'next/link';

import { Text } from '~components/Text/Text';

type LinkElement = HTMLElementTagNameMap['a'];
interface LinkProps extends React.HTMLAttributes<LinkElement> {
	variant: 'header' | 'footer';
	href: string;
}

export const CustomLink = forwardRef<LinkElement, LinkProps>(({ variant, children, className, href, ...rest }, ref) => {
	const handleClick = () => {
		const targetElement = document.getElementById(href?.slice(1));

		if (targetElement) {
			targetElement.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<Link href={href} scroll={false} onClick={handleClick} className={className} ref={ref} {...rest}>
			<Text variant={variant}>{children}</Text>
		</Link>
	);
});

CustomLink.displayName = 'CustomLink';
