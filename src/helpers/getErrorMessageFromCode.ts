import { getMatch } from './getMatch';

export function getErrorMessageFromCode<C extends string | number>(
	code: C,
	errorValues: Record<C, string>,
): string {
	return getMatch(code, {
		403: 'Немає прав доступу!',
		500: 'Помилка на боці серверу! Спробуйте пізніше!',
		_: 'Невідома помилка',
		...errorValues,
	});
}
