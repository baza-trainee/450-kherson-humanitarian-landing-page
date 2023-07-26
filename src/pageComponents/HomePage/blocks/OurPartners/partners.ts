import type { StaticImageData } from 'next/image';

import partner6 from '~assets/images/partners/bevar-ukraine.png';
import partner1 from '~assets/images/partners/fundacja-ukraina.png';
import partner8 from '~assets/images/partners/german-food-bridge.png';
import partner7 from '~assets/images/partners/hungarian-ecumenical-help-service.png';
import partner5 from '~assets/images/partners/logistics-center-of-finland.png';
import partner4 from '~assets/images/partners/nova-poshta.png';
import partner3 from '~assets/images/partners/rls.png';
import partner2 from '~assets/images/partners/society-of-ukrainians-in-Finland.png';

interface Logo {
	src: StaticImageData;
	alt: string;
	id: number;
}

export const partners: Logo[] = [
	{ id: 1, src: partner1, alt: 'fundacja-ukraina' },
	{ id: 2, src: partner2, alt: 'society-of-ukrainians-in-Finland' },
	{ id: 3, src: partner3, alt: 'rls' },
	{ id: 4, src: partner4, alt: 'nova-poshta' },
	{ id: 5, src: partner5, alt: 'logistics-center-of-finland' },
	{ id: 6, src: partner6, alt: 'bevar-ukraine' },
	{ id: 7, src: partner7, alt: 'hungarian-ecumenical-help-service' },
	{ id: 8, src: partner8, alt: 'german-food-bridge' },
];
