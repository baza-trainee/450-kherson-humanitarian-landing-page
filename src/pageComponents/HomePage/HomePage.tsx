import { ArrowUpButton } from '~components/Buttons/ArrowUpButton';

import { AboutUs } from './blocks/AboutUs/AboutUs';
import { GetHelp } from './blocks/GetHelp/GetHelp';
import { Hero } from './blocks/Hero/Hero';
import { OurAchievements } from './blocks/OurAchievements/OurAchievements';
import { OurActivity } from './blocks/OurActivity/OurActivity';
import { OurPartners } from './blocks/OurPartners/OurPartners';
import { Projects } from './blocks/Projects/Projects';

export function HomePage() {
	return (
		<>
			<Hero />
			<AboutUs />
			<OurAchievements />
			<GetHelp />
			<OurActivity />
			<Projects />
			<OurPartners />
			<ArrowUpButton />
		</>
	);
}
