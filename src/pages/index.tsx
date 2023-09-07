import { HomePage } from '~/pageComponents/HomePage/HomePage';
import { getActiveListsQuantityDTO } from '~api/dto/list/getActiveListsQuantityDTO';
import { api } from '~api/index';
import type { GetHelpLists } from '~api/types/GetHelp/GetHelpLists';
import { Meta } from '~components/Meta/Meta';
import { RootLayout } from '~components/RootLayout/RootLayout';
import { APP } from '~constants/APP';

export interface HomeProps {
	getHelpLists?: GetHelpLists;
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

	const activeListsData = await api.lists.getActiveListsQuantity();
	if ('data' in activeListsData) props.getHelpLists = getActiveListsQuantityDTO(activeListsData.data);

	return { props };
}
