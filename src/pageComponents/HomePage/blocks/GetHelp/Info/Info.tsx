import { useEffect, useState } from 'react';

import Image from 'next/image';

import type { GetHelpLists } from '~api/types/GetHelp/GetHelpLists';
import type { HelpCategories } from '~api/types/GetHelp/HelpCategories';
import { Text } from '~components/Text/Text';

import { getImagePercentage } from './helpers/getImagePercentage';
import { getSrcUrlFromTag } from './helpers/getSrcUrlFromTag';

import s from './Info.module.scss';

interface InfoProps {
	lists?: GetHelpLists;
	activeTab: HelpCategories;
}

export function Info({ lists, activeTab }: InfoProps) {
	const [mapSrc, setMapSrc] = useState('');

	useEffect(() => {
		const fetchMapIframe = () => {
			const mapIframe =
				'<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2674.5033769251186!2d33.37251627641638!3d47.90729676716482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40db20a8af29a41f%3A0x38ba7c4ae3e4aaf1!2z0YPQuy4g0JPQtdGC0YzQvNCw0L3RgdC60LDRjywgMznQsCwg0JrRgNC40LLQvtC5INCg0L7Qsywg0JTQvdC10L_RgNC-0L_QtdGC0YDQvtCy0YHQutCw0Y8g0L7QsdC70LDRgdGC0YwsIDUwMDA3!5e0!3m2!1sru!2sua!4v1692095716080!5m2!1sru!2sua" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';
			const srcUrl = getSrcUrlFromTag(mapIframe);
			setMapSrc(srcUrl || '');
		};
		fetchMapIframe();
	}, []);

	const imgPercentage = getImagePercentage(
		lists?.[activeTab].personsRegistered || 0,
		lists?.[activeTab].availableSets || 0,
	);

	return (
		<div className={s.Info}>
			<div className={s.tracker}>
				<Text variant="h3">На отримання наборів зареєстровано</Text>
				<div className={s.trackerIndicator}>
					<Image src={`/svg/getHelp/state-${imgPercentage}.svg`} alt={'status'} width={120} height={120} />
					<div className={s.numbers}>
						<Text variant="various2">{lists?.[activeTab].personsRegistered}</Text>
						<Text variant="various2">/</Text>
						<Text variant="various2">{lists?.[activeTab].availableSets}</Text>
					</div>
				</div>
				<Text variant="subtitle">
					Місцезнаходження пункту видачі гуманітарної допомоги: м. Кривий Ріг, вул. Гетьманська 39А
				</Text>
			</div>
			{mapSrc && (
				<iframe
					src={mapSrc}
					allowFullScreen={false}
					loading="lazy"
					referrerPolicy="no-referrer-when-downgrade"
					className={s.map}
				/>
			)}
		</div>
	);
}
