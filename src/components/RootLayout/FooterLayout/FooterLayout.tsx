import Image from 'next/image';
import Link from 'next/link';

import { Icon } from '~components/Icon/Icon';
import { Text } from '~components/Text/Text';
import { useScreenQuery } from '~hooks/useScreenQuery';

import { contacts } from './contacts';
import { renderGreyBlock } from './RenderGreyBlock';
import email from '/public/svg/icons/email.svg';
import location from '/public/svg/icons/location.svg';
import phone from '/public/svg/icons/phone.svg';

import s from './FooterLayout.module.scss';

export function FooterLayout() {
	const { isScreenTabletSm, isScreenTabletXl } = useScreenQuery();

	return (
		<footer className={s.FooterLayout} id="Footer">
			<div className={s.grey}>{renderGreyBlock({ isScreenTabletSm, isScreenTabletXl })}</div>
			<div className={s.blue}>
				<div className={s.contacts}>
					<div className={s.iconAndText}>
						<Image src={location} alt="location" width={24} height={24} />
						<Text className={s.whiteColor} variant="footer">
							<div dangerouslySetInnerHTML={{ __html: contacts[0] }} />
						</Text>
					</div>
					<div className={s.iconAndText}>
						<Image src={email} alt="email" width={24} height={24} />
						<Text className={s.whiteColor} variant="footer">
							{contacts[1]}
						</Text>
					</div>
					<div className={s.iconAndText}>
						<Image src={phone} alt="phone" width={24} height={24} />
						<Text className={s.whiteColor} variant="footer">
							{contacts[2]}
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
