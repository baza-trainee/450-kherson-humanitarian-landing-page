export function getIndexByKey<E, V>(array: E[], key: keyof E, value: V): number {
	return array.findIndex((item) => item[key] === value);
}
