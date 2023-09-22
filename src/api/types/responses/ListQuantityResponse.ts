import type { ListResponse } from './ListResponse';

export type ListQuantityResponse = Pick<ListResponse, '_id' | 'maxQuantity' | 'confirmedPersons' | 'type'>;
