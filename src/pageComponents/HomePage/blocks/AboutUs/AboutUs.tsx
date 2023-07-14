import { Container } from '~components/Container/Container';
import { Section } from '~components/Section/Section';

import s from './AboutUs.module.scss';

export function AboutUs() {
	return (
		<Section className={s.AboutUs} id="AboutUs">
			<Container>
				<h2>AboutUs</h2>
			</Container>
		</Section>
	);
}
