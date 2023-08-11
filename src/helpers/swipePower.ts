export function swipePower(offset: number, velocity: number) {
	return Math.abs(offset) * velocity;
}
