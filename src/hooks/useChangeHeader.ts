import { useEffect, useState } from 'react';

export function useChangeHeader(elementId: string, offset: number) {
	const [isElementScrolled, setIsElementScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const element = document.getElementById(elementId);

			if (element) {
				const sectionTop = element.getBoundingClientRect().top;
				if (sectionTop <= offset) {
					setIsElementScrolled(true);
				} else {
					setIsElementScrolled(false);
				}
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [elementId, offset]);

	return isElementScrolled;
}
