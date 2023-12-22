import { forwardRef } from 'react';

import { clsx } from 'clsx';

import s from './Container.module.scss';

export type ContainerElement = HTMLDivElement;

type ReactHTMLElementAttributes<
	E,
	A extends React.HTMLAttributes<E> = React.HTMLAttributes<E>,
> = React.DetailedHTMLProps<A, E>;

export type ContainerProps = ReactHTMLElementAttributes<ContainerElement>;

export const Container = forwardRef<ContainerElement, ContainerProps>(({ children, className, ...rest }, ref) => {
	const componentClass = [className, s.Container];
	return (
		<div className={clsx(componentClass)} ref={ref} {...rest}>
			{children}
		</div>
	);
});

Container.displayName = 'Section';
