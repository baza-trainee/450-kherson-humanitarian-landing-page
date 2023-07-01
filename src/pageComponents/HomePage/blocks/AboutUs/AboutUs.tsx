import Image from 'next/image';

import { Container } from '~components/Container/Container';
import { Section } from '~components/Section/Section';

import partner6 from '../../../../assets/images/partners/bevar-ukraine.png';
import partner1 from '../../../../assets/images/partners/fundacja-ukraina.png';
import partner8 from '../../../../assets/images/partners/german-food-bridge.png';
import partner7 from '../../../../assets/images/partners/hungarian-ecumenical-help-service.png';
import partner5 from '../../../../assets/images/partners/logistics-center-of-finland.png';
import partner4 from '../../../../assets/images/partners/nova-poshta.png';
import partner3 from '../../../../assets/images/partners/rls.png';
import partner2 from '../../../../assets/images/partners/society-of-ukrainians-in-Finland.png';

import s from './AboutUs.module.scss';

// interface Logo {
// 	src: string;
// 	alt: string;
// 	id:string
//  }

// const arrayOfLogos:Logo[] = [partner1, partner2, partner3];

export function AboutUs() {
	return (
		<Section className={s.AboutUs}>
			<Container>
				<h2 className={s.title}>Наші партнери</h2>
				<div className={s.flexContainer}>
					{/* {arrayOfLogos.map((logo) => {
					return	<Image src={logo.src} width={130} alt={logo.alt} key={logo.id}/>;
					})} */}

					<Image src={partner1} width={130} alt="fundacja-ukraina" />

					<Image src={partner2} width={130} alt="society-of-ukrainians-in-Finland" />

					<Image src={partner3} width={130} alt="rls" />

					<Image src={partner4} width={130} alt="nova-poshta" />

					<Image src={partner5} width={130} alt="logistics-center-of-finland" />

					<Image src={partner6} width={130} alt="bevar-ukraine" />

					<Image src={partner7} width={130} alt="hungarian-ecumenical-help-service" />

					<Image src={partner8} width={130} alt="german-food-bridge" />
				</div>
			</Container>
		</Section>
	);
}
