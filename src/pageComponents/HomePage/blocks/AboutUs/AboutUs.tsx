import { Container } from '~components/Container/Container';
import { Section } from '~components/Section/Section';

import style from './AboutUs.module.scss';

export function AboutUs() {
	return (
		<Section className={style.AboutUs}>
			<Container>
				<h2>AboutUs</h2>
			</Container>
		</Section>
	);
}
