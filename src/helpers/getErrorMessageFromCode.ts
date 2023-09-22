export function getErrorMessageFromCode<C extends string | number, M>(
	code: C,
	errorValues: Record<C, M>,
	defaultValue: M | string = 'Невідома помилка',
): M | string {
	return (
		{
			...errorValues,
		}[code] || defaultValue
	);
}
