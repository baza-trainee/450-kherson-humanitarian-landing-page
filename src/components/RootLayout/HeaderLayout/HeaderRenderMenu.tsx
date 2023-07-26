import Image from 'next/image';

import { BurgerMenu } from '~components/BurgerMenu/BurgerMenu';
import { ButtonLink } from '~components/Buttons/ButtonLink';
import { NavigationList } from '~components/NavigationList/NavigationList';

import { navigation } from './navigation';
import logo from '/public/svg/logo.svg';

import s from './HeaderLayout.module.scss';

interface HeaderMobileMenuProps {
	isMenuOpen: boolean;
	handleMenuOpen: (newState: boolean) => void;
}

const mobileHeader: React.FC<HeaderMobileMenuProps> = ({ handleMenuOpen, isMenuOpen }) => {
	return (
		<div className={s.row}>
			<Image priority={true} src={logo} alt="logo" width={142} height={60} />
			<BurgerMenu onMenuOpen={handleMenuOpen} isMenuOpen={isMenuOpen} />
		</div>
	);
};
interface HeaderTabletMenuProps {
	isMenuOpen: boolean;
	handleMenuOpen: (newState: boolean) => void;
	isScrolledToAboutUs: boolean;
}
const tabletHeader: React.FC<HeaderTabletMenuProps> = ({ handleMenuOpen, isMenuOpen, isScrolledToAboutUs }) => {
	return (
		<div className={s.row}>
			<Image priority={true} src={logo} alt="logo" width={142} height={60} />
			{isScrolledToAboutUs && <ButtonLink href="#get-help">Отримати допомогу</ButtonLink>}
			<BurgerMenu onMenuOpen={handleMenuOpen} isMenuOpen={isMenuOpen} />
		</div>
	);
};
interface HeaderDesktopMenuProps {
	isScrolledToAboutUs: boolean;
}

const desktopHeader: React.FC<HeaderDesktopMenuProps> = ({ isScrolledToAboutUs }) => {
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
};

interface ScreenProps extends HeaderTabletMenuProps {
	isScreenTabletXl: boolean;
	isScreenTabletSm: boolean;
}

export const renderHeader = ({
	handleMenuOpen,
	isMenuOpen,
	isScrolledToAboutUs,
	isScreenTabletSm,
	isScreenTabletXl,
}: ScreenProps) => {
	if (isScreenTabletXl) {
		return desktopHeader({ isScrolledToAboutUs });
	} else if (isScreenTabletSm) {
		return tabletHeader({ handleMenuOpen, isMenuOpen, isScrolledToAboutUs });
	} else {
		return mobileHeader({ handleMenuOpen, isMenuOpen });
	}
};
