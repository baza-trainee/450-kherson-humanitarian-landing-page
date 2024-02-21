import Image from 'next/image';

import type { GetHelpInfo } from '~api/types/getHelp/GetHelpInfo';
import type { GetHelpLists } from '~api/types/getHelp/GetHelpLists';
import type { HelpCategories } from '~api/types/getHelp/HelpCategories';
import { Text } from '~components/Text/Text';
import { getMatch } from '~helpers/getMatch';

import { InfoData  } from '../../../defaultData/getHelpInfoData';
import { getImagePercentage } from './helpers/getImagePercentage';
import { getSrcUrlFromTag } from './helpers/getSrcUrlFromTag';

import s from './Info.module.scss';

interface InfoProps {
	lists?: GetHelpLists;
	activeTab: HelpCategories;
	info?: GetHelpInfo;
}

export function Info({ lists, activeTab, info }: InfoProps) {

	const address = info?.address ? info.address : InfoData .address;
	const mapUrl = info?.mapUrl ? getSrcUrlFromTag(info.mapUrl) : getSrcUrlFromTag(InfoData .mapUrl);
	const imgPercentage = getImagePercentage(
		lists?.[activeTab].personsRegistered || 0,
		lists?.[activeTab].availableSets || 0,
	);

	return (
		<div className={s.Info}>
			<div className={s.tracker}>
				{lists && lists?.[activeTab].availableSets > 0 ? (
					<>
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
					</>
				) : (
					<Text variant="h3">
						{getMatch(activeTab, {
							idp: 'Немає доступних наборів для ВПО',
							invalid: 'Немає доступних наборів для людей з інвалідністю',
							child: 'Немає доступних наборів для дітей',
							_: null,
						})}
					</Text>
				)}

				<Text variant="subtitle">
					Місцезнаходження пункту видачі гуманітарної допомоги:
					<br />
					{address}

				</Text>
			</div>
			{mapUrl && (
				<iframe
					src={mapUrl}
					allowFullScreen={false}
					loading="lazy"
					referrerPolicy="no-referrer-when-downgrade"
					className={s.map}
				/>
			)}
		</div>
	);
}
