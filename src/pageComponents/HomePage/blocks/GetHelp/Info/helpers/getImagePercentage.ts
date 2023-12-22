export function getImagePercentage(count: number, max: number): number {
	if (count === 0) return 0;
	const percent = count / (max / 100);
	const truncPercent = Math.trunc(percent / 10) * 10;
	return truncPercent;
}
