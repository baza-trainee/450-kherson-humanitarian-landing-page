import { useCallback } from 'react';

import type { HTMLMotionProps, PanInfo } from 'framer-motion';

import { swipePower } from '~helpers/swipePower';

export function useHandleDrag(
	callbackRight: (dir?: number | undefined) => void,
	callbackLeft: (dir?: number | undefined) => void,
) {
	const handleDragEnd = useCallback<NonNullable<HTMLMotionProps<'div'>['onDragEnd']>>(
		(e: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
			if (e.target instanceof HTMLElement) {
				e.target.style.cursor = 'grab';

				const swipe = swipePower(offset.x, velocity.x);

				if (swipe < -1000) {
					callbackRight();
				} else if (swipe > 1000) {
					callbackLeft();
				}
			}
		},
		[callbackRight, callbackLeft],
	);

	const handleDragStart = useCallback<NonNullable<HTMLMotionProps<'div'>['onDragStart']>>(
		(e: MouseEvent | TouchEvent | PointerEvent) => {
			if (e.target instanceof HTMLElement) {
				e.target.style.cursor = 'grabbing';
			}
		},
		[],
	);

	return { handleDragEnd, handleDragStart };
}
