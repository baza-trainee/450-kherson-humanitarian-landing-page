import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import { Icon } from '~components/Icon/Icon';
import { CustomLink } from '~components/Link/Link';
import { Text } from '~components/Text/Text';
import { useScreenQuery } from '~hooks/useScreenQuery';

import { navigation } from '../HeaderLayout/navigation';
import { documents } from './documents';
import email from '/public/svg/icons/email.svg';
import location from '/public/svg/icons/location.svg';
import phone from '/public/svg/icons/phone.svg';
import logo from '/public/svg/logo.svg';

import s from './FooterLayout.module.scss';

export function FooterLayout() {
	const { isScreenTabletSm, isScreenTabletXl } = useScreenQuery();

	const navComponent = (
		<ul className={s.navigation}>
			{navigation.map(({ id, name, href }) => (
				<li className={s.navigationItem} key={id}>
					<CustomLink href={href} variant="footer" className={s.link}>
						{name}
					</CustomLink>
				</li>
			))}
		</ul>
	);
	const documentsList = (
		<ul className={s.navigation}>
			{documents.map(({ id, name, href }) => (
				<li className={s.navigationItem} key={id}>
					<CustomLink href={href} target="_blank" variant="footer" className={s.link}>
						{name}
					</CustomLink>
				</li>
			))}
		</ul>
	);

	const greyBlockMobile = (
		<div className={s.flex}>
			<div className={s.twoLists}>
				{navComponent}
				{documentsList}
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
				{navComponent}
				{documentsList}
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
				{navComponent}
				{documentsList}
			</div>
		</div>
	);

	const renderGreyBlock = () => {
		if (isScreenTabletXl) {
			return greyBlockDesktop;
		} else if (isScreenTabletSm) {
			return greyBlockTablet;
		} else {
			return greyBlockMobile;
		}
	};

	return (
		<footer className={s.FooterLayout} id="Footer">
			<div className={s.grey}>{renderGreyBlock()}</div>
			<div className={s.blue}>
				<div className={s.contacts}>
					<div className={s.iconAndText}>
						<Image src={location} alt="location" width={24} height={24} />
						<Text className={s.whiteColor} variant="footer">
							50014 Україна
							<br /> Дніпропетровська область
							<br /> Кривий Ріг, вул. Ракітіна, буд. 9
						</Text>
					</div>
					<div className={s.iconAndText}>
						<Image src={email} alt="email" width={24} height={24} />
						<Text className={s.whiteColor} variant="footer">
							go450.kryvyi.rih@gmail.com
						</Text>
					</div>
					<div className={s.iconAndText}>
						<Image src={phone} alt="phone" width={24} height={24} />
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
						<Link target="_blank" href="https://www.facebook.com/go450.kryvyi.rih">
							<Icon
								onClick={() => {
									/**/
								}}
								className={s.icon}
								icon="icon--facebook"
								colors={{ default: 'var(--color--shades-1)', hover: 'var(--color--warning-1)' }}
							></Icon>
						</Link>
						<Link target="_blank" href="https://www.instagram.com/4_5_0_kryvyi_rih/">
							<Icon
								onClick={() => {
									/**/
								}}
								className={s.icon}
								icon="icon--instagram"
								colors={{ default: 'var(--color--shades-1)', hover: 'var(--color--warning-1)' }}
							></Icon>
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
