import clsx from 'clsx';
import Image from 'next/image';

import { ButtonLink } from '~components/Buttons/ButtonLink';
import { Icon } from '~components/Icon/Icon';
import { CustomLink } from '~components/Link/Link';
import { useKeyPress } from '~hooks/useKeyPress';
import { useScreenQuery } from '~hooks/useScreenQuery';

import { navigation } from '../RootLayout/HeaderLayout/navigation';
import logo from '/public/svg/logo.svg';

import s from './BurgerMenu.module.scss';

interface BurgerMenuProps {
	onMenuOpen: (newState: boolean) => void;
	isMenuOpen: boolean;
}

export function BurgerMenu({ onMenuOpen, isMenuOpen }: BurgerMenuProps) {
	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			onMenuOpen(false);
		}
	};

	const hideBurger = () => {
		onMenuOpen(!isMenuOpen);
	};

	useKeyPress('Escape', hideBurger);

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
			<Icon icon="icon--burger" className={clsx(s.icon, s.burger)} onClick={hideBurger}></Icon>

			{isMenuOpen && (
				<div className={s.backdrop} onClick={handleBackdropClick}>
					<div className={s.whiteField}>
						<Icon icon="icon--close" className={clsx(s.icon, s.close)} onClick={hideBurger}></Icon>

						{isScreenTabletSm ? (
							<div className={s.column}>
								<Image priority={true} src={logo} alt="logo" width={360} height={152} />
								{navComponent}
							</div>
						) : (
							<div className={s.column}>
								<Image priority={true} src={logo} alt="logo" width={170} height={72} />

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
