import { Container } from '~components/Container/Container';
import { Section } from '~components/Section/Section';
import { Text } from '~components/Text/Text';

import { ButtonHelpUs } from '../../ButtonHelpUs/ButtonHelpUs';
import { blocks } from './blocks';

import s from './OurAchievements.module.scss';

export function OurAchievements() {
	return (
		<Section className={s.OurAchievements}>
			<Container className={s.flexContainer}>
				<Text variant="h2">Наші досягнення</Text>
				<Text variant="p">За час існування організації</Text>
				<div className={s.blocks}>
					{blocks.map((block) => {
						const line = block.title.split('\n');
						return (
							<div className={s.block} key={block.id}>
								<Text variant="p" className={s.title}>
									{line[0]} <br />
									{line[1]}
								</Text>
								<div className={s.achievement}>
									<Text variant="various1" className={s.number}>
										{block.number}
									</Text>
									<Text variant="p">{block.unit}</Text>
								</div>
							</div>
						);
					})}
				</div>
				<Text variant="p">*Інформація подана станом на 01.07.2023</Text>
				<div className={s.button}>
					<ButtonHelpUs />
				</div>
			</Container>
		</Section>
	);
}
