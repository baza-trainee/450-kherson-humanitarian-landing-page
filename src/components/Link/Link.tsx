import { forwardRef } from 'react';

// import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import { Text } from '~components/Text/Text';

type LinkElement = HTMLElementTagNameMap['a'];
interface LinkProps extends React.HTMLAttributes<LinkElement> {
	variant: 'header' | 'footer';
	href: string;
}

export const CustomLink = forwardRef<LinkElement, LinkProps>(({ variant, children, className, href, ...rest }, ref) => {
	// const [sections] = useState(['AboutUs', 'OurActivity', 'Projects', 'OurPartners']);
	// const activeLinkRef = useRef<HTMLAnchorElement | null>(null);
	// const [scrollEnabled, setScrollEnabled] = useState(true);

	// useEffect(() => {
	// 	if (!scrollEnabled) return;
	// 	const handleScroll = () => {
	// 		const newActiveSection = sections.find((section) => {
	// 			const element = document.getElementById(section);
	// 			if (element) {
	// 				const rect = element.getBoundingClientRect();
	// 				return rect.top <= 0 && rect.bottom > 0;
	// 			}
	// 			return false;
	// 		});
	// 		console.log();
	// 		if (newActiveSection) {
	// 			const link = document.querySelector(`a[href="/#${newActiveSection}"]`);

	// 			if (link instanceof HTMLAnchorElement) {
	// 				activeLinkRef.current?.blur();
	// 				link.focus();
	// 				activeLinkRef.current = link;
	// 			}
	// 		}
	// 	};

	// 	window.addEventListener('scroll', handleScroll);
	// 	return () => {
	// 		window.removeEventListener('scroll', handleScroll);
	// 	};
	// }, [sections, scrollEnabled]);

	const handleClick = () => {
		// setScrollEnabled(false);

		const targetElement = document.getElementById(href?.slice(1));

		if (targetElement instanceof HTMLAnchorElement) {
			targetElement.scrollIntoView({ behavior: 'smooth' });
			// activeLinkRef.current = targetElement;
		}
		// setTimeout(() => {
		// 	setScrollEnabled(true);
		// }, 5000);
	};

	return (
		<Link href={href} scroll={false} onClick={handleClick} className={className} ref={ref} {...rest}>
			<Text variant={variant}>{children}</Text>
		</Link>
	);
});

CustomLink.displayName = 'CustomLink';
