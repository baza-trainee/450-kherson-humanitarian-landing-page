import { Container } from '~components/Container/Container';
import { Section } from '~components/Section/Section';

import s from './OurActivity.module.scss';

export function OurActivity() {
	return (
		<Section className={s.OurActivity} id="our-activity">
			<Container>
				<h2>OurActivity</h2>
			</Container>
		</Section>
	);
}
