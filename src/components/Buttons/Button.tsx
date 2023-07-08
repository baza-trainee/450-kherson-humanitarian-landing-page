import { forwardRef } from 'react';

import clsx from 'clsx';

import s from './Button.module.scss';

type ButtonElement = HTMLElementTagNameMap['button'];
interface ButtonProps extends React.HTMLAttributes<ButtonElement> {
	disabled?: boolean;
	type?: 'primary' | 'secondary';
	submit?: boolean;
}

export const Button = forwardRef<ButtonElement, ButtonProps>(
	({ type = 'primary', submit, disabled, children, className, ...rest }, ref) => {
		const componentClass = [type && s[type], disabled && `${s.disabled}`];
		return (
			<button
				type={submit ? 'submit' : 'button'}
				className={clsx(s.Button, className, componentClass)}
				disabled={disabled}
				ref={ref}
				{...rest}
			>
				<span className={s.label}>{children}</span>
			</button>
		);
	},
);

Button.displayName = 'Button';
