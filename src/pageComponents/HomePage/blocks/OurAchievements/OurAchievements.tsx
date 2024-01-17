import type { DonationsResponse } from '~api/types/backend/responses/DonationsResponse';
import { Container } from '~components/Container/Container';
import { Section } from '~components/Section/Section';
import { Text } from '~components/Text/Text';

import { ButtonHelpUs } from '../../ButtonHelpUs/ButtonHelpUs';
import { blocks, date } from './blocks';

import s from './OurAchievements.module.scss';

interface OurAchievementsProps {
	donations?: DonationsResponse;
}

export function OurAchievements({ donations }: OurAchievementsProps) {
	return (
		<Section className={s.OurAchievements}>
			<Container className={s.flexContainer}>
				<Text variant="h2">Наші досягнення</Text>
				<Text variant="p">За час існування організації</Text>
				<div className={s.blocks}>
					{blocks.map((block) => {
						return (
							<div className={s.block} key={block.id}>
								<div className={s.content}>
									<Text variant="p" className={s.title} lineBreak>
										{block.title}
									</Text>
									<div className={s.achievement}>
										<Text variant="various1">{block.number}</Text>
										<Text variant="p">{block.unit}</Text>
									</div>
								</div>
							</div>
						);
					})}
				</div>
				<Text variant="p">*Інформація подана станом на {date}</Text>
				<div className={s.button}>
					<ButtonHelpUs donations={donations} />
				</div>
			</Container>
		</Section>
	);
}
