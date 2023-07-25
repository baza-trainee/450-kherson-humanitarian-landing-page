import { useEffect, useState } from 'react';

import clsx from 'clsx';
import Image from 'next/image';

import { BurgerMenu } from '~components/BurgerMenu/BurgerMenu';
import { ButtonLink } from '~components/Buttons/ButtonLink';
import { Container } from '~components/Container/Container';
import { CustomLink } from '~components/Link/Link';
import { useScreenQuery } from '~hooks/useScreenQuery';
import { useScrollLock } from '~hooks/useScrollLock';

import { navigation } from './navigation';
import logo from '/public/svg/logo.svg';

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
			const sectionForChangeHeader = document.getElementById('AboutUs');

			if (sectionForChangeHeader) {
				const sectionTop = sectionForChangeHeader.getBoundingClientRect().top;
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
			<Image priority={true} src={logo} alt="logo" width={142} height={60} />
			<BurgerMenu onMenuOpen={handleMenuOpen} isMenuOpen={isMenuOpen} />
		</div>
	);
	const tabletHeader = (
		<div className={s.row}>
			<Image priority={true} src={logo} alt="logo" width={142} height={60} />
			{isScrolledToAboutUs && <ButtonLink href="#GetHelp">Отримати допомогу</ButtonLink>}
			<BurgerMenu onMenuOpen={handleMenuOpen} isMenuOpen={isMenuOpen} />
		</div>
	);
	const desktopHeader = (
		<div className={s.row}>
			<Image src={logo} alt="logo" width={142} height={60} />
			<ul className={s.navigation}>
				{navigation.map(({ id, name, href }) => (
					<li className={s.navigationItem} key={id}>
						<CustomLink href={href} variant="header" className={s.link}>
							{name}
						</CustomLink>
					</li>
				))}
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
