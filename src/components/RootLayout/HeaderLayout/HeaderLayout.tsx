import { useEffect, useState } from 'react';

import clsx from 'clsx';

import { Container } from '~components/Container/Container';
import { useScreenQuery } from '~hooks/useScreenQuery';
import { useScrollLock } from '~hooks/useScrollLock';

import { renderHeader } from './HeaderRenderMenu';

import s from './HeaderLayout.module.scss';

export function HeaderLayout() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const { lockScroll, unlockScroll } = useScrollLock();
	useEffect(() => {
		if (isMenuOpen) {
			lockScroll();
		} else {
			unlockScroll();
		}
	}, [isMenuOpen, lockScroll, unlockScroll]);

	const handleMenuOpen = (newState: boolean): void => {
		setIsMenuOpen(newState);
	};
	const [isScrolledToAboutUs, setIsScrolledToAboutUs] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const changeHeader = document.getElementById('about-us');

			if (changeHeader) {
				const sectionTop = changeHeader.getBoundingClientRect().top;
				const offset = 80;
				if (sectionTop <= offset) {
					setIsScrolledToAboutUs(true);
				} else {
					setIsScrolledToAboutUs(false);
				}
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const { isScreenTabletSm } = useScreenQuery();
	const { isScreenTabletXl } = useScreenQuery();

	const headerToRender = renderHeader({
		isScreenTabletSm,
		isScreenTabletXl,
		isMenuOpen,
		handleMenuOpen,
		isScrolledToAboutUs,
	});

	return (
		<header className={clsx(s.HeaderLayout, isScrolledToAboutUs && s.whiteColor, !isMenuOpen && s.blur)}>
			<Container>{headerToRender}</Container>
		</header>
	);
}
