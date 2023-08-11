import { useCallback } from 'react';

import type { HTMLMotionProps } from 'framer-motion';

import { swipePower } from '~helpers/swipePower';

export function useHandleDrag(
	callbackRight: (dir?: number | undefined) => void,
	callbackLeft: (dir?: number | undefined) => void,
) {
	const handleDrag = useCallback<NonNullable<HTMLMotionProps<'div'>['onDragEnd']>>(
		(e, { offset, velocity }) => {
			(e.target as HTMLDivElement).style.cursor = 'grab';

			const swipe = swipePower(offset.x, velocity.x);

			if (swipe < -1000) {
				callbackRight();
			} else if (swipe > 1000) {
				callbackLeft();
			}
		},
		[callbackRight, callbackLeft],
	);

	return { handleDrag };
}
