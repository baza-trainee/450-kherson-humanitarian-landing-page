export function calculateSwipeOffset(offset: number, velocity: number) {
	return Math.abs(offset) * velocity;
}
