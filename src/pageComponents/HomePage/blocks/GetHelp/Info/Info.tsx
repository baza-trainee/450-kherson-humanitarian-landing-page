import Image from 'next/image';

import type { GetHelpInfo } from '~api/types/getHelpBlock/GetHelpInfo';
import type { GetHelpLists } from '~api/types/getHelpBlock/GetHelpLists';
import type { HelpCategories } from '~api/types/getHelpBlock/HelpCategories';
import { Text } from '~components/Text/Text';

import { getImagePercentage } from './helpers/getImagePercentage';

import s from './Info.module.scss';

interface InfoProps {
	lists?: GetHelpLists;
	activeTab: HelpCategories;
	info?: GetHelpInfo;
}

export function Info({ lists, activeTab, info }: InfoProps) {
	const imgPercentage = getImagePercentage(
		lists?.[activeTab].personsRegistered || 0,
		lists?.[activeTab].availableSets || 0,
	);

	return (
		<div className={s.Info}>
			<div className={s.tracker}>
				<Text variant="h3">На отримання наборів зареєстровано</Text>
				<div className={s.trackerIndicator}>
					<Image
						src={`/svg/getHelp/state-${imgPercentage}.svg`}
						alt={'status'}
						width={120}
						height={120}
					/>
					<div className={s.numbers}>
						<Text variant="various2">{lists?.[activeTab].personsRegistered || 0}</Text>
						<Text variant="various2">/</Text>
						<Text variant="various2">{lists?.[activeTab].availableSets || 0}</Text>
					</div>
				</div>

				<Text variant="subtitle">
					Місцезнаходження пункту видачі гуманітарної допомоги:
					<br />
					{info?.address && info.address}
				</Text>
			</div>
			{info?.mapUrl && (
				<iframe
					src={info?.mapUrl}
					allowFullScreen={false}
					loading="lazy"
					referrerPolicy="no-referrer-when-downgrade"
					className={s.map}
				/>
			)}
		</div>
	);
}
