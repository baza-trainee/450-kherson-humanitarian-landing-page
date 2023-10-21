import { useEffect, useState } from 'react';

import { LoaderOverlay } from '~components/LoaderOverlay/LoaderOverlay';

export function useLoaderOverlay() {
	const [isLoader, setIsLoader] = useState(false);

	const [LoaderComponent, setLoaderComponent] = useState(
		() =>
			function Component() {
				return <></>;
			},
	);

	useEffect(() => {
		if (isLoader) {
			setLoaderComponent(
				() =>
					function Component() {
						return <LoaderOverlay />;
					},
			);
		} else {
			setLoaderComponent(
				() =>
					function Component() {
						return <></>;
					},
			);
		}
	}, [isLoader]);

	const showLoaderOverlay = () => setIsLoader(true);

	const hideLoaderOverlay = () => setIsLoader(false);

	return { showLoaderOverlay, hideLoaderOverlay, isLoader, LoaderOverlay: LoaderComponent };
}
