import { commonGet } from '~api/common/commonGet';
import type { ExportListResponse } from '~api/types/backend/responses/ExportListResponse';

export const getListFileEndpointById = (listId: string) =>
	commonGet<ExportListResponse>(`/export-order/generate/${listId}`);
