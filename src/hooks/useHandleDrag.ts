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
	isOpen?: boolean;
}) {
	const [isDragging, setIsDragging] = useState(false);

	const handleDragEnd = useCallback<NonNullable<HTMLMotionProps<'div'>['onDragEnd']>>(
		(e: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
			const swipe = calculateSwipeOffset(offset.x, velocity.x);

			if (swipe < -1000) {
				if (callbackRight) callbackRight();
			} else if (swipe > 1000) {
				if (callbackLeft) callbackLeft();
			}
			setIsDragging(false);
		},
		[callbackRight, callbackLeft],
	);

	const handleDragStart = useCallback<NonNullable<HTMLMotionProps<'div'>['onDragStart']>>(() => {
		setIsDragging(true);
	}, []);

	const handleOpenModal = useCallback(() => {
		if (!isDragging && !!openModal) {
			openModal();
		}
	}, [isDragging, openModal]);

	return { handleDragEnd, handleDragStart, handleOpenModal };
}
