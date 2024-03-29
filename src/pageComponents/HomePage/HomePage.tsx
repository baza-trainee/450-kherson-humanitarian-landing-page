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
			<Hero heroData={data.getHeroes} donations={data.donations} />
			<AboutUs fund={data.aboutUsFund} team={data.aboutUsTeam} history={data.aboutUsHistory} />
			<OurAchievements donations={data.donations} achievements={data.getOurAchievements} />
			<GetHelp lists={data.getHelpLists} info={data.getHelpInfo} />
			<OurActivity ourActivityData={data.ourActivityData} />
			<Projects projects={data.projects} donations={data.donations} />
			<OurPartners partnersData={data.partners} />
			<ArrowUpButton />
		</>
	);
}
