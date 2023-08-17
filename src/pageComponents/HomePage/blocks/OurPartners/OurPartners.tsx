import Image from 'next/image';

import { Container } from '~components/Container/Container';
import { Section } from '~components/Section/Section';
import { Text } from '~components/Text/Text';

import { partners } from './partners';

import s from './OurPartners.module.scss';

export function OurPartners() {
	return (
		<Section className={s.OurPartners} id="our-partners">
			<Container className={s.container}>
				<Text variant="h2">Наші партнери</Text>
				<div className={s.logoContainer}>
					{partners.map((logo) => {
						return <Image src={logo.src} alt={logo.alt} key={logo.id} className={s.logo} />;
					})}
				</div>
			</Container>
		</Section>
	);
}
