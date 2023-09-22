import { commonGet } from '~api/common/commonGet';
import type { ExportListResponse } from '~api/types/responses/ExportListResponse';

export const getListFileEndpointById = (listId: string) =>
	commonGet<ExportListResponse>(`/export-order/generate/${listId}`);
