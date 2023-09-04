export function getSrcUrlFromTag(string: string): string | null {
	const regex = /(?<=src=").*?(?=[*"])/;
	const matchString = string.match(regex)?.[0];
	if (matchString) return matchString;
	return null;
}
