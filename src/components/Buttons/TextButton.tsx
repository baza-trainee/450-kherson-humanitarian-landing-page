import { forwardRef } from 'react';

import clsx from 'clsx';

import s from './TextButton.module.scss';

type ButtonElement = HTMLElementTagNameMap['button'];
interface ButtonProps extends React.HTMLAttributes<ButtonElement> {
	disabled?: boolean;
	type?: 'primary' | 'secondary';
	submit?: boolean;
}

export const Button = forwardRef<ButtonElement, ButtonProps>(
	({ type = 'primary', submit, disabled, children, className, ...rest }, ref) => {
		const componentClass = [
			disabled && type === 'primary' && s.disabledPrimary,
			disabled && type === 'secondary' && s.disabledSecondary,
			type && s[type],
		];
		return (
			<button
				type={submit ? 'submit' : 'button'}
				className={clsx(s.Button, className, componentClass)}
				ref={ref}
				{...rest}
			>
				<span className={clsx(s.label)}>{children}</span>
			</button>
		);
	},
);

Button.displayName = 'Button';
