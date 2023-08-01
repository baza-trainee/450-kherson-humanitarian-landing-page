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
	return (
		<div className={s.row}>
			<Image src={logo} alt="logo" width={142} height={60} />
			<NavigationList navigation={navigation} variant="header" navStyle={s.navigation} linkStyle={s.underline} />

			{isScrolledToAboutUs ? (
				<ButtonLink href="#get-help">Отримати допомогу</ButtonLink>
			) : (
				<ButtonLink href="#get-help" className={s.visibilityHidden}>
					Отримати допомогу
				</ButtonLink>
			)}
		</div>
	);
}
