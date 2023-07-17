import { Container } from '~components/Container/Container';
import { Section } from '~components/Section/Section';

import s from './Hero.module.scss';

export function Hero() {
	return (
		<Section className={s.Hero} id="Hero">
			<Container>
				<h2>Hero</h2>
			</Container>
		</Section>
	);
}
