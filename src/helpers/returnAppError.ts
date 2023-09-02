import { APP } from '~constants/APP';

import { returnError } from './returnError';

export function returnAppError(error: unknown): string {
	return returnError(error, APP.name, 1);
}
