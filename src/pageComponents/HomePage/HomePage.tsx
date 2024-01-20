import { ArrowUpButton } from '~components/Buttons/ArrowUpButton';
import type { HomeProps } from '~pages/index';

import { AboutUs } from './blocks/AboutUs/AboutUs';
import { GetHelp } from './blocks/GetHelp/GetHelp';
import { Hero } from './blocks/Hero/Hero';
import { OurAchievements } from './blocks/OurAchievements/OurAchievements';
import { OurActivity } from './blocks/OurActivity/OurActivity';
import { OurPartners } from './blocks/OurPartners/OurPartners';
import { Projects } from './blocks/Projects/Projects';

interface HomePageProps {
	data: HomeProps;
}

export function HomePage({ data }: HomePageProps) {
	return (
		<>
			<Hero heroData={data.getHeroes} />
			<AboutUs />
			<OurAchievements donations={data.donations} />
			<GetHelp lists={data.getHelpLists} info={data.getHelpInfo} />
			<OurActivity />
			<Projects projects={data.projects} />
			<OurPartners partnersData={data.partners} />
			<ArrowUpButton />
		</>
	);
}
