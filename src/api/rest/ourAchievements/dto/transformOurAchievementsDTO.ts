import type { OurAchievementsResponse } from '~api/types/backend/responses/OurAchievementsResponse';

export function transformOurAchievementsDTO(data: OurAchievementsResponse) {
	return {
		issuedSets: data.issuedHumanitarianKits?.toString() || '0',
		receivedHelp: data.receivedHumanitarianAid?.toString() || '0',
		donations: data.sumDonats?.toString() || '0',
		issueDate: data.infoAtDate ? new Date(data.infoAtDate).toLocaleDateString() : '',
	};
}
