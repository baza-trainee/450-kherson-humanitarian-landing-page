import { forwardRef, useEffect, useRef } from 'react';

import clsx from 'clsx';

import { mergeRefs } from '~components/helpers/mergeRefs';

import s from './Backdrop.module.scss';

export type BackdropElement = HTMLButtonElement;

export interface BackdropProps extends ReactHTMLElementAttributes<BackdropElement> {
	opacity?: number;
	disabled?: boolean;
	clickable?: boolean;
	show: boolean;
}

export const Backdrop = forwardRef<BackdropElement, BackdropProps>(
	({ className, disabled, clickable, show, opacity, ...rest }, ref) => {
		const backdropRef = useRef<HTMLButtonElement>(null);

		useEffect(() => {
			if (backdropRef && opacity) backdropRef.current?.style.setProperty('--backdrop-opacity', `${opacity}%`);
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [backdropRef]);

		const componentClass = [disabled && s.disabled, show && s.show, clickable && s.clickable];

		return (
			<button
				type="button"
				className={clsx(s.Backdrop, className, componentClass)}
				ref={mergeRefs([ref, backdropRef])}
				{...rest}
			>
				{}
			</button>
		);
	},
);

Backdrop.displayName = 'Backdrop';
