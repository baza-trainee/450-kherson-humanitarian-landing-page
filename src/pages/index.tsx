import { HomePage } from '~/pageComponents/HomePage/HomePage';
import { api } from '~api/index';
import { transformDocumentsOfMainSiteDTO } from '~api/rest/footer/dto/transformDocumentsDTO';
import type { AboutUs } from '~api/types/aboutUs/aboutUs';
import type { DonationsResponse } from '~api/types/backend/responses/DonationsResponse';
import type { FooterData } from '~api/types/footer/FooterData';
import type { GetHelpInfo } from '~api/types/getHelp/GetHelpInfo';
import type { GetHelpLists } from '~api/types/getHelp/GetHelpLists';
import type { Heroes } from '~api/types/hero/Heroes';
import type { OurAchievements } from '~api/types/ourAchievements/OurAchievements';
import type { OurActivitiesData } from '~api/types/ourActivity/OurActivitiesData';
import type { Partners } from '~api/types/partners/Partners';
import { Meta } from '~components/Meta/Meta';
import { RootLayout } from '~components/RootLayout/RootLayout';
import { APP } from '~constants/APP';

export interface HomeProps {
	getHelpLists?: GetHelpLists;
	getHelpInfo?: GetHelpInfo;
	getHeroes?: Heroes;
	donations?: DonationsResponse;
	partners?: Partners;
	footerData?: FooterData;
	getOurAchievements?: OurAchievements;
	ourActivityData?: OurActivitiesData;
	aboutUsFund?: AboutUs;
	aboutUsTeam?: AboutUs;
	aboutUsHistory?: AboutUs;
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

	//add api func from your block here ↓

	const listResp = await api.lists.getActiveListsQuantity();
	if ('data' in listResp) props.getHelpLists = listResp.data;

	const getHelpResp = await api.getHelpAdmin.getGetHelp();
	if ('data' in getHelpResp) props.getHelpInfo = getHelpResp.data;

	const getHeroesResp = await api.hero.getHeroes();
	if ('data' in getHeroesResp) props.getHeroes = getHeroesResp.data;

	const DonationsResp = await api.donations.getDonations();
	if ('data' in DonationsResp) props.donations = DonationsResp.data;

	const partnersResp = await api.partners.getPartners();
	if ('data' in partnersResp) props.partners = partnersResp.data;

	const getAboutUsFundResp = await api.aboutUs.getAboutUsFund();
	if ('data' in getAboutUsFundResp) props.aboutUsFund = getAboutUsFundResp.data;

	const getAboutUsTeamResp = await api.aboutUs.getAboutUs('team');
	if ('data' in getAboutUsTeamResp) props.aboutUsTeam = getAboutUsTeamResp.data;

	const getAboutUsHistoryResp = await api.aboutUs.getAboutUs('history');
	if ('data' in getAboutUsHistoryResp) props.aboutUsHistory = getAboutUsHistoryResp.data;

	const contactsResp = await api.footer.getContacts();

	const documentsResp = await api.footer.getDocuments();

	if ('data' in contactsResp && 'data' in documentsResp && documentsResp.data) {
		const contactsData = contactsResp.data;
		const documentsData = transformDocumentsOfMainSiteDTO(documentsResp.data);
		if (contactsData && documentsData) props.footerData = { contactsData, documentsData };
	}

	const ourAchievementsResp = await api.ourAchievements.getOurAchievements();
	if ('data' in ourAchievementsResp) props.getOurAchievements = ourAchievementsResp.data;

	const ourActivityResp = await api.ourActivity.getOurActivities();
	if ('data' in ourActivityResp) props.ourActivityData = ourActivityResp.data;

	return { props };
}
