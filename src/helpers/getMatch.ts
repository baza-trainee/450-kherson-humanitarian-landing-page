export function getMatch<M>(
	code: string | number | undefined | null = null,
	values: Record<string | number | symbol, M> & { _: M },
): M {
	return code ? values[code] : values._;
}
