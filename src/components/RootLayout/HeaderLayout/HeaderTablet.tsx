import Image from 'next/image';

import { BurgerMenu } from '~components/BurgerMenu/BurgerMenu';
import { ButtonLink } from '~components/Buttons/ButtonLink';

import logo from '/public/svg/logo.svg';

import s from './HeaderLayout.module.scss';

interface HeaderTabletMenuProps {
	isMenuOpen: boolean;
	handleMenuOpen: (newState: boolean) => void;
	isScrolledToAboutUs: boolean;
}
export function HeaderTablet({ handleMenuOpen, isMenuOpen, isScrolledToAboutUs }: HeaderTabletMenuProps) {
	return (
		<div className={s.row}>
			<Image priority={true} src={logo} alt="logo" width={142} height={60} />
			{isScrolledToAboutUs && <ButtonLink href="#get-help">Отримати допомогу</ButtonLink>}
			<BurgerMenu onMenuOpen={handleMenuOpen} isMenuOpen={isMenuOpen} />
		</div>
	);
}
