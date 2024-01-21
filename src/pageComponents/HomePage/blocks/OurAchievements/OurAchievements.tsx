import type { Donations } from '~api/types/donations/donations';
import type { OurAchievements } from '~api/types/ourAchievements/OurAchievements';
import { Container } from '~components/Container/Container';
import { Section } from '~components/Section/Section';
import { Text } from '~components/Text/Text';

import { ButtonHelpUs } from '../../ButtonHelpUs/ButtonHelpUs';
import { blocks } from '../../defaultData/ourAchievementsData';

import s from './OurAchievements.module.scss';

interface OurAchievementsProps {
	donations?: Donations;
	achievements?: OurAchievements;
}

export function OurAchievements({ donations, achievements }: OurAchievementsProps) {
	return (
		<Section className={s.OurAchievements}>
			<Container className={s.flexContainer}>
				<Text variant="h2">Наші досягнення</Text>
				<Text variant="p">За час існування організації</Text>

				<div className={s.blocks}>
					<div className={s.block}>
						<div className={s.content}>
							<Text variant="p" className={s.title}>
								Було видано наборів
								<br />
								гуманітарної допомоги
							</Text>
							<div className={s.achievement}>
								<Text variant="various1">
									{achievements?.issuedSets.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') ||
										blocks.issuedSets}
								</Text>
								<Text variant="p">шт</Text>
							</div>
						</div>
					</div>
					<div className={s.block}>
						<div className={s.content}>
							<Text variant="p" className={s.title}>
								Було отримано
								<br />
								гуманітарної допомоги
							</Text>
							<div className={s.achievement}>
								<Text variant="various1">
									{achievements?.receivedHelp.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') ||
										blocks.receivedHelp}
								</Text>
								<Text variant="p">тонн</Text>
							</div>
						</div>
					</div>
					<div className={s.block}>
						<div className={s.content}>
							<Text variant="p" className={s.title}>
								Нам
								<br />
								задонатили
							</Text>
							<div className={s.achievement}>
								<Text variant="various1">
									{achievements?.donations.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') ||
										blocks.donations}
								</Text>
								<Text variant="p">UAH</Text>
							</div>
						</div>
					</div>
				</div>
				<Text variant="p">
					*Інформація подана станом на {achievements?.issueDate || blocks.issueDate}
				</Text>
				<div className={s.button}>
					<ButtonHelpUs donations={donations} />
				</div>
			</Container>
		</Section>
	);
}
