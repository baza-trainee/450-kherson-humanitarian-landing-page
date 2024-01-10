import Image from 'next/image';
import Link from 'next/link';

import type { FooterData } from '~api/types/footer/FooterData';
import { Icon } from '~components/Icon/Icon';
import { Text } from '~components/Text/Text';
import { useScreenQuery } from '~hooks/useScreenQuery';

import { contacts } from './data/contacts';
import { socials } from './data/socials';
import { GreyBlockDesktop } from './GreyBlock/GreyBlockDesktop';
import { GreyBlockMobile } from './GreyBlock/GreyBlockMobile';
import { GreyBlockTablet } from './GreyBlock/GreyBlockTablet';

import s from './FooterLayout.module.scss';
interface FooterDataProps {
	footerData?: FooterData;
}
export function FooterLayout(footerData: FooterDataProps) {
	const { isScreenTabletSm, isScreenTabletXl } = useScreenQuery();

	return (
		<footer className={s.FooterLayout} id="footer">
			<div className={s.grey}>
				{isScreenTabletXl ? (
					<GreyBlockDesktop />
				) : isScreenTabletSm ? (
					<GreyBlockTablet />
				) : (
					<GreyBlockMobile />
				)}
			</div>
			<div className={s.blue}>
				<div className={s.contacts}>
					{contacts
						.filter((contact) => contact.value !== '')
						.map((contact) => (
							<div className={s.iconAndText} key={contact.id}>
								<Image src={contact.src} alt={contact.name} width={24} height={24} />
								<Text className={s.textInBlueBlock} variant="footer" lineBreak>
									{contact.value}
								</Text>
							</div>
						))}
				</div>
				<div className={s.socialNetworks}>
					<Text className={s.textInBlueBlock} variant="footer">
						Ми в соціальних мережах
					</Text>
					<div className={s.icons}>
						{socials.map((social) => (
							<Link target="_blank" href={social.href} key={social.id}>
								<Icon
									icon={`icon--${social.name}`}
									colors={{
										default: 'var(--color--shades-1)',
										hover: 'var(--color--warning-1)',
									}}
									clickable
								/>
							</Link>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
}
