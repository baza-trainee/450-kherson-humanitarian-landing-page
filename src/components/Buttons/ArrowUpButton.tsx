import { forwardRef } from 'react';
import { useEffect, useState } from 'react';

import clsx from 'clsx';

import { Icon } from '~components/Icon/Icon';

import s from './ArrowUpButton.module.scss';

type ButtonElement = HTMLElementTagNameMap['button'];
type ButtonProps = React.HTMLAttributes<ButtonElement>;

export const ArrowUpButton = forwardRef<ButtonElement, ButtonProps>(({ className, ...rest }, ref) => {
	const [showButton, setShowButton] = useState(false);

	const handleScrollUp = () => {
		setShowButton(window.scrollY > document.documentElement.clientHeight);
	};

	const handleScrollDown = () => {
		const FooterSection = document.getElementById('Footer');
		if (FooterSection) {
			const sectionRect = FooterSection.getBoundingClientRect();
			const windowHeight = window.innerHeight;
			setShowButton(sectionRect.top > windowHeight);
		}
	};

	useEffect(() => {
		const handleScroll = () => {
			const getHelpSection = document.getElementById('GetHelp');
			if (getHelpSection) {
				const sectionRect = getHelpSection.getBoundingClientRect();
				const windowHeight = window.innerHeight;

				if (sectionRect.top <= windowHeight) {
					handleScrollDown();
				} else {
					handleScrollUp();
				}
			}
		};
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<button
			className={clsx(s.Button, className, !showButton && s.hidden)}
			onClick={() => {
				document.documentElement.scrollIntoView({ block: 'start' });
			}}
			ref={ref}
			{...rest}
		>
			<Icon
				icon="icon--arrow-up"
				colors={{
					default: 'var(--color--primary-3)',
					hover: 'var(--color--primary-3)',
					click: 'var(--color--shades-1)',
				}}
				onClick={() => {
					/**/
				}}
			></Icon>
		</button>
	);
});

ArrowUpButton.displayName = 'ArrowUpButton';
