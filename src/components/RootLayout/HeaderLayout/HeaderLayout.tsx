import { useEffect, useState } from 'react';

import clsx from 'clsx';

import { Container } from '~components/Container/Container';
import { useChangeHeader } from '~hooks/useChangeHeader';
import { useScreenQuery } from '~hooks/useScreenQuery';
import { useScrollLock } from '~hooks/useScrollLock';

import { HeaderDesktop } from './HeaderDesktop';
import { HeaderMobile } from './HeaderMobile';
import { HeaderTablet } from './HeaderTablet';

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

	const isScrolledToAboutUs = useChangeHeader('about-us', 80);

	const { isScreenTabletSm, isScreenTabletXl } = useScreenQuery();

	const componentClass = [isScrolledToAboutUs && s.whiteColor, !isMenuOpen && s.blur];

	return (
		<header className={clsx(s.HeaderLayout, componentClass)}>
			<Container>
				{isScreenTabletXl ? (
					<HeaderDesktop isScrolledToAboutUs={isScrolledToAboutUs} />
				) : isScreenTabletSm ? (
					<HeaderTablet
						isMenuOpen={isMenuOpen}
						handleMenuOpen={handleMenuOpen}
						isScrolledToAboutUs={isScrolledToAboutUs}
					/>
				) : (
					<HeaderMobile isMenuOpen={isMenuOpen} handleMenuOpen={handleMenuOpen} />
				)}
			</Container>
		</header>
	);
}
