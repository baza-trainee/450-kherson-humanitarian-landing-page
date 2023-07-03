import { forwardRef } from 'react';

import clsx from 'clsx';

import s from './ArrowUpButton.module.scss';

type ButtonElement = HTMLElementTagNameMap['button'];
type ButtonProps = React.HTMLAttributes<ButtonElement>;

export const Button = forwardRef<ButtonElement, ButtonProps>(({ children, className, ...rest }, ref) => {
	return (
		<button className={clsx(s.Button, className)} ref={ref} {...rest}>
			<span className={clsx(s.label)}>{children}</span>
		</button>
	);
});

Button.displayName = 'Button';
