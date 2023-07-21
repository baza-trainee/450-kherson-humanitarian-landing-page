import { useEffect, useRef } from 'react';

export function useKeyPress(key: string, callback: (event: Event) => void) {
	const callbackRef = useRef(callback);

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	useEffect(() => {
		const onKeyup: EventListener = (event) => {
			if ((event as unknown as KeyboardEvent).key === key) {
				callbackRef.current(event);
			}
		};
		document.body.addEventListener('keydown', onKeyup);
		return () => document.body.removeEventListener('keydown', onKeyup);
	}, [key]);
}
