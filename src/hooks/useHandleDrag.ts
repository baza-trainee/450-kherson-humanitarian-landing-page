import { useCallback, useState } from 'react';

import type { HTMLMotionProps, PanInfo } from 'framer-motion';

import { calculateSwipeOffset } from '~helpers/calculateSwipeOffset';

export function useHandleDrag({
	callbackRight,
	callbackLeft,
	openModal,
}: {
	callbackRight: (dir?: number) => void;
	callbackLeft: (dir?: number) => void;
	openModal?: () => void;
}) {
	const [isDragging, setIsDragging] = useState(false);

	const handleDragEnd = useCallback<NonNullable<HTMLMotionProps<'div'>['onDragEnd']>>(
		(e: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
			if (e.target instanceof HTMLElement) {
				e.target.style.cursor = 'grab';

				const swipe = calculateSwipeOffset(offset.x, velocity.x);

				if (swipe < -1000) {
					if (callbackRight) callbackRight();
				} else if (swipe > 1000) {
					if (callbackLeft) callbackLeft();
				}
			}
			setIsDragging(false);
		},
		[callbackRight, callbackLeft],
	);

	const handleDragStart = useCallback<NonNullable<HTMLMotionProps<'div'>['onDragStart']>>(
		(e: MouseEvent | TouchEvent | PointerEvent) => {
			if (e.target instanceof HTMLElement) {
				e.target.style.cursor = 'grabbing';
			}
			setIsDragging(true);
		},
		[],
	);

	const handleOpenModal = useCallback(() => {
		if (!isDragging && !!openModal) {
			openModal();
		}
	}, [isDragging, openModal]);

	return { handleDragEnd, handleDragStart, handleOpenModal };
}
