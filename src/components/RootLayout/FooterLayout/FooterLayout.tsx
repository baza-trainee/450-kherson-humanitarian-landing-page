import Image from 'next/image';
import Link from 'next/link';

import { Icon } from '~components/Icon/Icon';
import { Text } from '~components/Text/Text';
import { useScreenQuery } from '~hooks/useScreenQuery';

import { contacts } from './contacts';
import { GreyBlockDesktop } from './GreyBlockDesktop';
import { GreyBlockMobile } from './GreyBlockMobile';
import { GreyBlockTablet } from './GreyBlockTablet';
import { socials } from './socials';

import s from './FooterLayout.module.scss';

export function FooterLayout() {
	const { isScreenTabletSm, isScreenTabletXl } = useScreenQuery();

	return (
		<footer className={s.FooterLayout} id="Footer">
			<div className={s.grey}>
				{isScreenTabletXl ? <GreyBlockDesktop /> : isScreenTabletSm ? <GreyBlockTablet /> : <GreyBlockMobile />}
			</div>
			<div className={s.blue}>
				<div className={s.contacts}>
					{contacts.map((contact) => (
						<div className={s.iconAndText} key={contact.id}>
							<Image src={contact.src} alt={contact.name} width={24} height={24} />
							<Text className={s.whiteColor} variant="footer">
								{contact.value}
							</Text>
						</div>
					))}
				</div>
				<div className={s.socialNetworks}>
					<Text className={s.whiteColor} variant="footer">
						Ми в соціальних мережах
					</Text>
					<div className={s.icons}>
						{socials.map((social) => (
							<Link target="_blank" href={social.href} className={s.iconSocial} key={social.id}>
								<Icon
									className={s.icon}
									icon={`icon--${social.name}`}
									colors={{ default: 'var(--color--shades-1)', hover: 'var(--color--warning-1)' }}
								/>
							</Link>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
}
