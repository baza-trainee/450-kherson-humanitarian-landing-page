import type { OurAchievementsResponse } from '~api/types/backend/responses/OurAchievementsResponse';

export function transformOurAchievementsDTO(data: OurAchievementsResponse) {
	return {
		issuedSets: data.issuedHumanitarianKits?.toString() || '',
		receivedHelp: data.receivedHumanitarianAid?.toString() || '',
		donations: data.sumDonats?.toString() || '',
		issueDate: data.infoAtDate ? new Date(data.infoAtDate).toLocaleDateString() : '',
	};
}
