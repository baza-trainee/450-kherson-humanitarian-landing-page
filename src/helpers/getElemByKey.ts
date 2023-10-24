export function getElemByKey<E, V>(array: E[], key: keyof E, value: V): E | null {
	return array.find((item) => item[key] === value) || null;
}
