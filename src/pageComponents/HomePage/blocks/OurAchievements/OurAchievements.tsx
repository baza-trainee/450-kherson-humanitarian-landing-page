import { Container } from '~components/Container/Container';
import { Section } from '~components/Section/Section';

import s from './OurAchievements.module.scss';

export function OurAchievements() {
	return (
		<Section className={s.OurAchievements}>
			<Container>
				<h2>OurAchievements</h2>
			</Container>
		</Section>
	);
}
