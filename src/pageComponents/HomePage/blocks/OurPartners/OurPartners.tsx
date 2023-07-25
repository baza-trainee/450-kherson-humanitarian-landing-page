import { Container } from '~components/Container/Container';
import { Section } from '~components/Section/Section';

import s from './OurPartners.module.scss';

export function OurPartners() {
	return (
		<Section className={s.OurPartners} id="our-partners">
			<Container>
				<h2>OurPartners</h2>
			</Container>
		</Section>
	);
}
