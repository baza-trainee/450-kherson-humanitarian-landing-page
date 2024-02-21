import Image from 'next/image';

import type { Partners } from '~api/types/partners/Partners';
import { Container } from '~components/Container/Container';
import { Section } from '~components/Section/Section';
import { Text } from '~components/Text/Text';
import { BASE_URL } from '~constants/BASE_URL';

import { partners } from '../../defaultData/partners';

import s from './OurPartners.module.scss';

interface OurPartnersProps {
	partnersData?: Partners;
}

export function OurPartners({ partnersData }: OurPartnersProps) {
	const addUrl = process.env.NODE_ENV === 'development' ? `${BASE_URL}` : '';

	const getFileNameFromUrl = (url: string) => {
		return url.split('.')[0].split('/').pop() || '';
	};

	return (
		<Section className={s.OurPartners} id="our-partners">
			<Container className={s.container}>
				<Text variant="h2">Наші партнери</Text>
				<div className={s.logoContainer}>
					{partnersData
						? partnersData.map((logo) => {
								return (
									<div className={s.logo} key={logo.id}>
										<Image
											src={`${addUrl}${logo.image}`}
											alt={getFileNameFromUrl(logo.image)}
											fill
											style={{ objectFit: 'contain' }}
										/>
									</div>
								);
						  })
						: partners.map((logo) => {
								return (
									<div className={s.logo} key={logo.id}>
										<Image
											src={logo.src}
											alt={logo.alt}
											fill
											style={{ objectFit: 'contain' }}
										/>
									</div>
								);
						  })}
				</div>
			</Container>
		</Section>
	);
}
