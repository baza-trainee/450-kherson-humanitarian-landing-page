import { Backdrop } from '~components/Backdrop/Backdrop';
import { Loader } from '~components/Loader/Loader';
import { Portal } from '~components/Portal/Portal';

import s from './LoaderOverlay.module.scss';

export function LoaderOverlay() {
	return (
		<Portal wrapperId={'loader-overlay'}>
			<div className={s.LoaderOverlay}>
				<Backdrop show />
				<Loader className={s.loader} />
			</div>
		</Portal>
	);
}
