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

import s from './OurPartners.module.scss';

// interface Logo {
// 	src: string;
// 	alt: string;
// 	id:string
//  }

// const arrayOfLogos:Logo[] = [partner1, partner2, partner3];

export function OurPartners() {
	return (
		<Section className={s.OurPartners}>
			<Container>
				<h2 className={s.title}>Наші партнери</h2>
				<div className={s.flexContainer}>
					{/* {arrayOfLogos.map((logo) => {
					return	<Image src={logo.src}  alt={logo.alt} key={logo.id}  className={s.logo}/>;
					})} */}

					<Image src={partner1} alt="fundacja-ukraina" className={s.logo} />

					<Image src={partner2} alt="society-of-ukrainians-in-Finland" className={s.logo} />

					<Image src={partner3} alt="rls" className={s.logo} />

					<Image src={partner4} alt="nova-poshta" className={s.logo} />

					<Image src={partner5} alt="logistics-center-of-finland" className={s.logo} />

					<Image src={partner6} alt="bevar-ukraine" className={s.logo} />

					<Image src={partner7} alt="hungarian-ecumenical-help-service" className={s.logo} />

					<Image src={partner8} alt="german-food-bridge" className={s.logo} />
				</div>
			</Container>
		</Section>
	);
}
