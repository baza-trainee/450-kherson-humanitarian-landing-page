import { HomePage } from '~/pageComponents/HomePage/HomePage';
import { getActiveListsDTO } from '~api/dto/list/getActiveListsDTO';
import { api } from '~api/index';
import type { GetHelpLists } from '~api/types/GetHelp/GetHelpLists';
import { Meta } from '~components/Meta/Meta';
import { RootLayout } from '~components/RootLayout/RootLayout';
import { APP } from '~constants/APP';

export interface HomeProps {
	getHelpLists: GetHelpLists;
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
	const activeListsData = await api.lists.getActiveLists();
	if ('data' in activeListsData) {
		return {
			props: { getHelpLists: getActiveListsDTO(activeListsData.data) },
		};
	}

	return;
}
