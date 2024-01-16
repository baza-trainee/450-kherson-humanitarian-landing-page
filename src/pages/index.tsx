import { HomePage } from '~/pageComponents/HomePage/HomePage';
import { api } from '~api/index';
import type { AboutUs } from '~api/types/aboutUs/aboutUs';
import type { DonationsResponse } from '~api/types/backend/responses/DonationsResponse';
import type { GetHelpInfo } from '~api/types/getHelp/GetHelpInfo';
import type { GetHelpLists } from '~api/types/getHelp/GetHelpLists';
import type { Heroes } from '~api/types/hero/Heroes';
import { Meta } from '~components/Meta/Meta';
import { RootLayout } from '~components/RootLayout/RootLayout';
import { APP } from '~constants/APP';

export interface HomeProps {
	getHelpLists?: GetHelpLists;
	getHelpInfo?: GetHelpInfo;
	getHeroes?: Heroes;
	donations?: DonationsResponse;
	aboutUsFund?: AboutUs;
	aboutUsTeam?: AboutUs;
	aboutUsHistory?: AboutUs;
}

export default function Home(data: HomeProps) {
	return (
		<RootLayout>
			<Meta title={APP.name}>
				<HomePage data={data} />
			</Meta>
		</RootLayout>
	);
}

export async function getServerSideProps() {
	const props = {} as HomeProps;

	//add api func from your block here ↓

	const listResp = await api.lists.getActiveListsQuantity();
	if ('data' in listResp) props.getHelpLists = listResp.data;

	const getHelpResp = await api.getHelp.getInfo();
	if ('data' in getHelpResp) props.getHelpInfo = getHelpResp.data;

	const getHeroesResp = await api.hero.getHeroes();
	if ('data' in getHeroesResp) props.getHeroes = getHeroesResp.data;

	const DonationsResp = await api.donations.getDonations();
	if ('data' in DonationsResp) props.donations = DonationsResp.data;

	const getAboutUsFundResp = await api.aboutUs.getAboutUsFund();
	if ('data' in getAboutUsFundResp) props.aboutUsFund = getAboutUsFundResp.data;

	const getAboutUsTeamResp = await api.aboutUs.getAboutUs('team');
	if ('data' in getAboutUsTeamResp) props.aboutUsTeam = getAboutUsTeamResp.data;

	const getAboutUsHistoryResp = await api.aboutUs.getAboutUs('history');
	if ('data' in getAboutUsHistoryResp) props.aboutUsHistory = getAboutUsHistoryResp.data;

	return { props };
}
