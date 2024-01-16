import { HomePage } from '~/pageComponents/HomePage/HomePage';
import { api } from '~api/index';
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

	const listResp = await api.lists.getActiveListsQuantity();
	if ('data' in listResp) props.getHelpLists = listResp.data;

	const getHelpResp = await api.getHelp.getInfo();
	if ('data' in getHelpResp) props.getHelpInfo = getHelpResp.data;

	const getHeroesResp = await api.hero.getHeroes();
	if ('data' in getHeroesResp) props.getHeroes = getHeroesResp.data;

	const DonationsResp = await api.donations.getDonations();
	if ('data' in DonationsResp) props.donations = DonationsResp.data;

	return { props };
}
