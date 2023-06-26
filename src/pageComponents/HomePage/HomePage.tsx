import { AboutUs } from './blocks/AboutUs/AboutUs';
import { GetHelp } from './blocks/GetHelp/GetHelp';
import { Hero } from './blocks/Hero/Hero';
import { OurAchievements } from './blocks/OurAchievements/OurAchievements';
import { OurPartners } from './blocks/OurPartners/OurPartners';
import { Projects } from './blocks/Projects/Projects';

export function HomePage() {
	return (
		<>
			<Hero />
			<AboutUs />
			<OurAchievements />
			<GetHelp />
			<Projects />
			<OurPartners />
		</>
	);
}
