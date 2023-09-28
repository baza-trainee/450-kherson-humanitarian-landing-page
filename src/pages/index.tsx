import { HomePage } from '~/pageComponents/HomePage/HomePage';
import { api } from '~api/index';
import type { GetHelpInfo } from '~api/types/getHelpBlock/GetHelpInfo';
import type { GetHelpLists } from '~api/types/getHelpBlock/GetHelpLists';
import { Meta } from '~components/Meta/Meta';
import { RootLayout } from '~components/RootLayout/RootLayout';
import { APP } from '~constants/APP';

export interface HomeProps {
	getHelpLists?: GetHelpLists;
	getHelpInfo?: GetHelpInfo;
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

	return { props };
}
