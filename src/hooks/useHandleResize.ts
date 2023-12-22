import { useEffect } from 'react';

export function useHandleResize(callback: () => void) {
	useEffect(() => {
		callback();
		window.addEventListener('resize', callback);
		return () => {
			window.removeEventListener('resize', callback);
		};
	}, [callback]);
}
