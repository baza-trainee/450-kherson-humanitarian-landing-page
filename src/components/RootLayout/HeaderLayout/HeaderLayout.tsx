import { useEffect, useState } from 'react';

import clsx from 'clsx';
import Image from 'next/image';

import { BurgerMenu } from '~components/BurgerMenu/BurgerMenu';
import { ButtonLink } from '~components/Buttons/ButtonLink';
import { Container } from '~components/Container/Container';
import { Navigation } from '~components/Navigation/Navigation';
import { useScreenQuery } from '~hooks/useScreenQuery';

import logo from '/public/svg/logo.svg';

import s from './HeaderLayout.module.scss';

export function HeaderLayout() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const handleMenuOpen = (newState: boolean): void => {
		setIsMenuOpen(newState);
	};
	const [isScrolledToAboutUs, setIsScrolledToAboutUs] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const aboutUsSection = document.getElementById('AboutUs');

			if (aboutUsSection) {
				const sectionTop = aboutUsSection.getBoundingClientRect().top;
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

	const mobileHeader = (
		<div className={s.row}>
			<Image src={logo} alt="logo" width={142} height={60} />
			<BurgerMenu onMenuOpen={handleMenuOpen} isMenuOpen={isMenuOpen} />
		</div>
	);
	const tabletHeader = (
		<div className={s.row}>
			<Image src={logo} alt="logo" width={142} height={60} />
			{isScrolledToAboutUs && <ButtonLink href="#GetHelp">Отримати допомогу</ButtonLink>}
			<BurgerMenu onMenuOpen={handleMenuOpen} isMenuOpen={isMenuOpen} />
		</div>
	);
	const desktopHeader = (
		<div className={s.row}>
			<Image src={logo} alt="logo" width={142} height={60} />
			<ul className={s.navigation}>
				<Navigation variant="header" className={s.link} />
			</ul>

			{isScrolledToAboutUs ? (
				<ButtonLink href="#GetHelp">Отримати допомогу</ButtonLink>
			) : (
				<ButtonLink href="#GetHelp" className={s.visibilityHidden}>
					Отримати допомогу
				</ButtonLink>
			)}
		</div>
	);

	const renderHeader = () => {
		if (isScreenTabletXl) {
			return desktopHeader;
		} else if (isScreenTabletSm) {
			return tabletHeader;
		} else {
			return mobileHeader;
		}
	};

	return (
		<header className={clsx(s.HeaderLayout, isScrolledToAboutUs && s.whiteColor, !isMenuOpen && s.blur)}>
			<Container>{renderHeader()}</Container>
		</header>
	);
}
