import clsx from 'clsx';
import Image from 'next/image';

import { ButtonLink } from '~components/Buttons/ButtonLink';
import { Icon } from '~components/Icon/Icon';
import { NavigationList } from '~components/NavigationList/NavigationList';
import { useKeyPress } from '~hooks/useKeyPress';
import { useScreenQuery } from '~hooks/useScreenQuery';

import { navigation } from '../RootLayout/HeaderLayout/navigation';
import logo from '/public/svg/logo.svg';

import s from './BurgerMenu.module.scss';

interface BurgerMenuProps {
	isMenuOpen: boolean;
	handleMenuOpen: (newState: boolean) => void;
}

export function BurgerMenu({ handleMenuOpen, isMenuOpen }: BurgerMenuProps) {
	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			handleMenuOpen(false);
		}
	};

	const hideBurger = () => {
		handleMenuOpen(!isMenuOpen);
	};

	useKeyPress('Escape', hideBurger);

	const { isScreenTabletSm } = useScreenQuery();

	return (
		<>
			<Icon icon="icon--burger" className={clsx(s.icon, s.burger)} onClick={hideBurger} />

			{isMenuOpen && (
				<div className={s.backdrop} onClick={handleBackdropClick}>
					<div className={s.whiteField}>
						<Icon icon="icon--close" className={clsx(s.icon, s.close)} onClick={hideBurger} />
						<div className={s.column}>
							{isScreenTabletSm ? (
								<>
									<Image priority={true} src={logo} alt="logo" width={360} height={152} />
									<NavigationList
										navigation={navigation}
										variant="header"
										onClick={hideBurger}
										navStyle={s.navigation}
										linkStyle={s.underline}
									/>
								</>
							) : (
								<>
									<Image priority={true} src={logo} alt="logo" width={170} height={72} />
									<div className={s.buttons}>
										<NavigationList
											navigation={navigation}
											variant="header"
											onClick={hideBurger}
											navStyle={s.navigation}
											linkStyle={s.underline}
										/>
										<ButtonLink href="#get-help">Отримати допомогу</ButtonLink>
									</div>
								</>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
}
