import { HomePage } from '~/pageComponents/HomePage/HomePage';
import { api } from '~api/index';
import type { FooterData } from '~api/types/footer/FooterData';
import type { GetHelpInfo } from '~api/types/getHelp/GetHelpInfo';
import type { GetHelpLists } from '~api/types/getHelp/GetHelpLists';
import { Meta } from '~components/Meta/Meta';
import { RootLayout } from '~components/RootLayout/RootLayout';
import { APP } from '~constants/APP';

export interface HomeProps {
	getHelpLists?: GetHelpLists;
	getHelpInfo?: GetHelpInfo;
	footerData?: FooterData;
}

export default function Home(data: HomeProps) {
	return (
		<RootLayout footerData={data.footerData}>
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

	const getContacts = await api.footer.getContacts();
	const getDocuments = await api.footer.getDocuments();
	if ('data' in getContacts && 'data' in getDocuments) {
		const contactsData = getContacts.data;
		const documentsData = getDocuments.data;
		if (contactsData && documentsData) props.footerData = { contactsData, documentsData };
	}

	return { props };
}
