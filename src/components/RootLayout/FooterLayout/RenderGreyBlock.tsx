import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import { NavigationList } from '~components/NavigationList/NavigationList';
import { Text } from '~components/Text/Text';

import { navigation } from '../HeaderLayout/navigation';
import { documents } from './documents';
import logo from '/public/svg/logo.svg';

import s from './FooterLayout.module.scss';

const greyBlockMobile = (
	<div className={s.flex}>
		<div className={s.twoLists}>
			<NavigationList navigation={navigation} variant="footer" navStyle={s.navigation} linkStyle={s.underline} />
			<NavigationList navigation={documents} variant="footer" navStyle={s.navigation} linkStyle={s.underline} />
		</div>

		<div className={s.logoAndCallToAction}>
			<Link href="#hero">
				<Image priority={true} src={logo} alt="logo" width={142} height={60} />
			</Link>
			<Text variant="h3">Давайте допоможемо разом</Text>
		</div>
		<Text variant="subtitle">Розробка Baza Trainee Ukraine 2023. Усі права захищені.</Text>
	</div>
);
const greyBlockTablet = (
	<div className={s.flex}>
		<div className={s.flexGrey}>
			<Link href="#hero">
				<Image priority={true} src={logo} alt="logo" width={142} height={60} />
			</Link>
			<Text variant="h3" className={clsx(s.fontSizeCallToAction, s.widthCallToAction)}>
				Давайте <br /> допоможемо разом
			</Text>
			<Text variant="subtitle" className={clsx(s.fontSizeBaza, s.widthBaza)}>
				Розробка Baza Trainee Ukraine 2023. <br /> Усі права захищені.
			</Text>
		</div>
		<div className={s.twoLists}>
			<NavigationList navigation={navigation} variant="footer" navStyle={s.navigation} linkStyle={s.underline} />
			<NavigationList navigation={documents} variant="footer" navStyle={s.navigation} linkStyle={s.underline} />
		</div>
	</div>
);
const greyBlockDesktop = (
	<div className={s.flex}>
		<div className={s.flexGrey}>
			<Link href="#hero">
				<Image priority={true} src={logo} alt="logo" width={290} height={120} />
			</Link>
			<div className={s.greyBlockText}>
				<Text variant="h3" className={s.widthCallToAction}>
					Давайте <br /> допоможемо разом
				</Text>
				<Text variant="subtitle" className={s.widthBaza}>
					Розробка Baza Trainee Ukraine 2023. <br /> Усі права захищені.
				</Text>
			</div>
		</div>
		<div className={s.twoLists}>
			<NavigationList navigation={navigation} variant="footer" navStyle={s.navigation} linkStyle={s.underline} />
			<NavigationList navigation={documents} variant="footer" navStyle={s.navigation} linkStyle={s.underline} />
		</div>
	</div>
);

interface ScreenProps {
	isScreenTabletXl: boolean;
	isScreenTabletSm: boolean;
}

export const renderGreyBlock = ({ isScreenTabletSm, isScreenTabletXl }: ScreenProps) => {
	if (isScreenTabletXl) {
		return greyBlockDesktop;
	} else if (isScreenTabletSm) {
		return greyBlockTablet;
	} else {
		return greyBlockMobile;
	}
};
