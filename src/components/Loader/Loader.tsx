import { forwardRef } from 'react';

import clsx from 'clsx';

import s from './Loader.module.scss';

export type LoaderElement = HTMLDivElement;

export type LoaderProps = ReactHTMLElementAttributes<LoaderElement>;

export const Loader = forwardRef<LoaderElement, LoaderProps>(({ className, ...rest }, ref) => (
	<div className={clsx(s.Loader, className)} ref={ref} {...rest}>
		<div />
		<div />
		<div />
	</div>
));

Loader.displayName = 'Loader';
