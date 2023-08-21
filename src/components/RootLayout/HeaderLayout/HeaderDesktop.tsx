import clsx from 'clsx';
import Image from 'next/image';

import { ButtonLink } from '~components/Buttons/ButtonLink';
import { NavigationList } from '~components/NavigationList/NavigationList';

import { navigation } from './navigation';
import logo from '/public/svg/logo.svg';

import s from './HeaderLayout.module.scss';

interface HeaderDesktopMenuProps {
	isScrolledToAboutUs: boolean;
}

export function HeaderDesktop({ isScrolledToAboutUs }: HeaderDesktopMenuProps) {
	const buttonLinkClass = !isScrolledToAboutUs && s.visibilityHidden;

	return (
		<div className={s.row}>
			<Image src={logo} alt="logo" width={142} height={60} />
			<NavigationList navigation={navigation} variant="header" navStyle={s.navigation} linkStyle={s.underline} />
			<ButtonLink href="#get-help" className={clsx(buttonLinkClass)}>
				Отримати допомогу
			</ButtonLink>
		</div>
	);
}
