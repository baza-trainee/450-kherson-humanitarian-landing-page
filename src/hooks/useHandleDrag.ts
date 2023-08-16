import { useCallback } from 'react';

import type { HTMLMotionProps, PanInfo } from 'framer-motion';

import { calculateSwipeOffset } from '~helpers/calculateSwipeOffset';

export function useHandleDrag(callbackRight: (dir?: number) => void, callbackLeft: (dir?: number) => void) {
	const handleDragEnd = useCallback<NonNullable<HTMLMotionProps<'div'>['onDragEnd']>>(
		(e: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
			if (e.target instanceof HTMLElement) {
				e.target.style.cursor = 'grab';

				const swipe = calculateSwipeOffset(offset.x, velocity.x);

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
