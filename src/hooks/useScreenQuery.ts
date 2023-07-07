import { useMediaQuery } from 'react-responsive';

import { SCREEN_SIZES } from '~/constants/SCREEN_SIZES';

interface UseScreenQueryReturn {
	isScreenDesktopXl: boolean;
	isScreenDesktopLg: boolean;
	isScreenDesktopMd: boolean;
	isScreenDesktopSm: boolean;

	isScreenTabletXl: boolean;
	isScreenTabletLg: boolean;
	isScreenTabletMd: boolean;
	isScreenTabletSm: boolean;

	isScreenMobileXl: boolean;
	isScreenMobileLg: boolean;
	isScreenMobileMd: boolean;
	isScreenMobileSm: boolean;
}

/**
 * Returns a boolean variable corresponding to the screen resolution
 *
 * isScreenDesktopXl → max-width: >1920
 * isScreenDesktopLg → max-width: >1536
 * isScreenDesktopMd → max-width: >1440
 * isScreenDesktopSm → max-width: >1366
 *
 * isScreenTabletXl → max-width: >1280
 * isScreenTabletLg → max-width: >1024
 * isScreenTabletMd → max-width: >960
 * isScreenTabletSm → max-width: >768
 *
 * isScreenMobileXl → max-width: >540
 * isScreenMobileLg → max-width: >480
 * isScreenMobileMd → max-width: >360
 * isScreenMobileSm → max-width: >0 — default
 *
 */
export function useScreenQuery(): UseScreenQueryReturn {
	return {
		isScreenDesktopXl: useMediaQuery({ query: `(max-width: ${SCREEN_SIZES.desktopXl}px)` }),
		isScreenDesktopLg: useMediaQuery({ query: `(max-width: ${SCREEN_SIZES.desktopLg}px)` }),
		isScreenDesktopMd: useMediaQuery({ query: `(max-width: ${SCREEN_SIZES.desktopMd}px)` }),
		isScreenDesktopSm: useMediaQuery({ query: `(max-width: ${SCREEN_SIZES.desktopSm}px)` }),

		isScreenTabletXl: useMediaQuery({ query: `(max-width: ${SCREEN_SIZES.tabletXl}px)` }),
		isScreenTabletLg: useMediaQuery({ query: `(max-width: ${SCREEN_SIZES.tabletLg}px)` }),
		isScreenTabletMd: useMediaQuery({ query: `(max-width: ${SCREEN_SIZES.tabletMd}px)` }),
		isScreenTabletSm: useMediaQuery({ query: `(max-width: ${SCREEN_SIZES.tabletSm}px)` }),

		isScreenMobileXl: useMediaQuery({ query: `(max-width: ${SCREEN_SIZES.mobileXl}px)` }),
		isScreenMobileLg: useMediaQuery({ query: `(max-width: ${SCREEN_SIZES.mobileLg}px)` }),
		isScreenMobileMd: useMediaQuery({ query: `(max-width: ${SCREEN_SIZES.mobileMd}px)` }),
		isScreenMobileSm: useMediaQuery({ query: `(max-width: ${SCREEN_SIZES.mobileSm}px)` }),
	};
}
