import { HomePage } from '~/pageComponents/HomePage/HomePage';
import { api } from '~api/index';
import type { AboutUs } from '~api/types/aboutUs/aboutUs';
import type { GetHelpInfo } from '~api/types/getHelp/GetHelpInfo';
import type { GetHelpLists } from '~api/types/getHelp/GetHelpLists';
import { Meta } from '~components/Meta/Meta';
import { RootLayout } from '~components/RootLayout/RootLayout';
import { APP } from '~constants/APP';

export interface HomeProps {
	getHelpLists?: GetHelpLists;
	getHelpInfo?: GetHelpInfo;
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

	const getAboutUsFundResp = await api.aboutUs.getAboutUsFund();
	if ('data' in getAboutUsFundResp) props.aboutUsFund = getAboutUsFundResp.data;

	const getAboutUsTeamResp = await api.aboutUs.getAboutUs('team');
	if ('data' in getAboutUsTeamResp) props.aboutUsTeam = getAboutUsTeamResp.data;

	const getAboutUsHistoryResp = await api.aboutUs.getAboutUs('history');
	if ('data' in getAboutUsHistoryResp) props.aboutUsHistory = getAboutUsHistoryResp.data;

	return { props };
}
