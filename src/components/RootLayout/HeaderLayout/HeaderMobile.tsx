import Image from 'next/image';

import { BurgerMenu } from '~components/BurgerMenu/BurgerMenu';

import logo from '/public/svg/logo.svg';

import s from './HeaderLayout.module.scss';

interface HeaderMobileMenuProps {
	isMenuOpen: boolean;
	handleMenuOpen: (newState: boolean) => void;
}

export function HeaderMobile({ handleMenuOpen, isMenuOpen }: HeaderMobileMenuProps) {
	return (
		<div className={s.row}>
			<Image priority={true} src={logo} alt="logo" width={142} height={60} />
			<BurgerMenu onMenuOpen={handleMenuOpen} isMenuOpen={isMenuOpen} />
		</div>
	);
}
