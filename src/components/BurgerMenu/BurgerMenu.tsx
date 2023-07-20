import { useEffect } from 'react';

import clsx from 'clsx';
import Image from 'next/image';

import { ButtonLink } from '~components/Buttons/ButtonLink';
import { Icon } from '~components/Icon/Icon';
import { CustomLink } from '~components/Link/Link';
import { useScreenQuery } from '~hooks/useScreenQuery';

import { navigation } from '../RootLayout/navigation';
import logo from '/public/svg/logo.svg';

import s from './BurgerMenu.module.scss';

interface BurgerMenuProps {
	onMenuOpen: (newState: boolean) => void;
	isMenuOpen: boolean;
}

export function BurgerMenu({ onMenuOpen, isMenuOpen }: BurgerMenuProps) {
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.code === 'Escape') {
				onMenuOpen(false);
			}
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [onMenuOpen]);

	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			onMenuOpen(false);
		}
	};

	const toggleMenu = () => {
		onMenuOpen(!isMenuOpen);
	};

	const hideBurger = () => {
		onMenuOpen(!isMenuOpen);
	};

	const { isScreenTabletSm } = useScreenQuery();

	const navComponent = (
		<ul className={s.navigation}>
			{navigation.map(({ id, name, href }) => (
				<li className={s.navigationItem} key={id}>
					<CustomLink href={href} variant="header" className={s.link} onClick={hideBurger}>
						{name}
					</CustomLink>
				</li>
			))}
		</ul>
	);

	return (
		<>
			<Icon icon="icon--burger" className={clsx(s.icon, s.burger)} onClick={toggleMenu}></Icon>

			{isMenuOpen && (
				<div className={s.backdrop} onClick={handleBackdropClick}>
					<div className={s.whiteField}>
						<Icon icon="icon--close" className={clsx(s.icon, s.close)} onClick={toggleMenu}></Icon>

						{isScreenTabletSm ? (
							<div className={s.column}>
								<Image src={logo} alt="logo" width={360} height={152} />
								{navComponent}
							</div>
						) : (
							<div className={s.column}>
								<Image src={logo} alt="logo" width={170} height={72} />

								<div className={s.buttons}>
									{navComponent}
									<ButtonLink href="#GetHelp">Отримати допомогу</ButtonLink>
								</div>
							</div>
						)}
					</div>
				</div>
			)}
		</>
	);
}
