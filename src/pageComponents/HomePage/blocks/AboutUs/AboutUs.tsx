import { Container } from '~components/Container/Container';
import { Section } from '~components/Section/Section';

import s from './AboutUs.module.scss';

export function AboutUs() {
	return (
		<Section className={s.AboutUs}>
			<Container>
				<h2 className={s.H1}>AboutUs</h2>
			</Container>
		</Section>
	);
}
