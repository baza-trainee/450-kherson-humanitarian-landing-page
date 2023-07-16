import clsx from 'clsx';
import Image from 'next/image';

import { Icon } from '~components/Icon/Icon';
// import { Navigation } from '~components/Navigation/Navigation';
import { Text } from '~components/Text/Text';
import { useScreenQuery } from '~hooks/useScreenQuery';

import email from '/public/svg/icons/email.svg';
import location from '/public/svg/icons/location.svg';
import phone from '/public/svg/icons/phone.svg';
import logo from '/public/svg/logo.svg';

import s from './FooterLayout.module.scss';

export function FooterLayout() {
	const greyBlockMobile = (
		<div className={s.flex}>
			{/* <Navigation variant="footer" className={s.link} flexDirection="rowFooter" /> */}
			<div className={s.logoAndCallToAction}>
				<Image src={logo} alt="logo" width={142} height={60} />
				<Text variant="h3">Давайте допоможемо разом</Text>
			</div>
			<Text variant="subtitle">Розробка Baza Trainee Ukraine 2023. Усі права захищені.</Text>
		</div>
	);
	const greyBlockTablet = (
		<div className={s.flex}>
			<div className={s.flexGrey}>
				<Image src={logo} alt="logo" width={142} height={60} />
				<Text variant="h3" className={clsx(s.fontSizeCallToAction, s.widthCallToAction)}>
					Давайте <br /> допоможемо разом
				</Text>
				<Text variant="subtitle" className={clsx(s.fontSizeBaza, s.widthBaza)}>
					Розробка Baza Trainee Ukraine 2023. <br /> Усі права захищені.
				</Text>
			</div>

			{/* <Navigation variant="footer" className={s.link} flexDirection="rowFooter" /> */}
		</div>
	);

	const greyBlockDesktop = (
		<div className={s.flex}>
			<div className={s.flexGrey}>
				<Image src={logo} alt="logo" width={290} height={120} />
				<Text variant="h3" className={s.widthCallToAction}>
					Давайте <br /> допоможемо разом
				</Text>
				<Text variant="subtitle" className={s.widthBaza}>
					Розробка Baza Trainee Ukraine 2023. Усі права захищені.
				</Text>
			</div>

			{/* <Navigation variant="footer" className={s.link} flexDirection="rowFooter" /> */}
		</div>
	);
	const { isScreenTabletSm, isScreenTabletXl } = useScreenQuery();

	const renderGreyBlock = () => {
		if (isScreenTabletXl) {
			return greyBlockDesktop;
		} else if (isScreenTabletSm) {
			return greyBlockTablet;
		} else {
			return greyBlockMobile;
		}
	};

	const iconClass = isScreenTabletSm && !isScreenTabletXl ? '' : `${s.icon}`;
	return (
		<footer className={s.FooterLayout}>
			<div className={s.grey}>{renderGreyBlock()}</div>
			<div className={s.blue}>
				<div className={s.contacts}>
					<div className={s.iconAndText}>
						<Image className={iconClass} src={location} alt="location" width={24} height={24} />
						<Text className={s.whiteColor} variant="footer">
							50014 Україна
							<br /> Дніпропетровська область <br /> Кривий Ріг, вул. Ракітіна, буд. 9
						</Text>
					</div>
					<div className={s.iconAndText}>
						<Image className={iconClass} src={email} alt="email" width={24} height={24} />
						<Text className={s.whiteColor} variant="footer">
							go450.kryvyi.rih@gmail.com
						</Text>
					</div>
					<div className={s.iconAndText}>
						<Image className={iconClass} src={phone} alt="phone" width={24} height={24} />
						<Text className={s.whiteColor} variant="footer">
							(+38)0 00 000 00 00
						</Text>
					</div>
				</div>
				<div className={s.socialNetworks}>
					<Text className={s.whiteColor} variant="footer">
						Ми в соціальних мережах
					</Text>
					<div className={s.icons}>
						<a target="_blank" href="https://www.facebook.com/go450.kryvyi.rih">
							<Icon
								onClick={() => {
									/**/
								}}
								className={s.icon}
								icon="icon--facebook"
								colors={{ default: 'var(--color--shades-1)', hover: 'var(--color--warning-1)' }}
							></Icon>
						</a>
						<a target="_blank" href="https://www.instagram.com/4_5_0_kryvyi_rih/">
							<Icon
								onClick={() => {
									/**/
								}}
								className={s.icon}
								icon="icon--instagram"
								colors={{ default: 'var(--color--shades-1)', hover: 'var(--color--warning-1)' }}
							></Icon>
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
