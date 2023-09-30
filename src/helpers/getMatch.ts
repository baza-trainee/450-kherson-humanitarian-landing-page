export function getMatch<C extends string | number, M>(
	code: C,
	values: Record<C, M> & { _: M },
): M {
	return values[code] || values._;
}
