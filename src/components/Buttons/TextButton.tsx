import { forwardRef } from 'react';

import clsx from 'clsx';

import s from './TextButton.module.scss';

type ButtonElement = HTMLElementTagNameMap['button'];
interface ButtonProps extends React.HTMLAttributes<ButtonElement> {
	size?: ' medium' | 'big';
	disabled?: boolean;
	type?: 'fill' | 'outline' | 'disabled';
	submit?: boolean;
}

export const Button = forwardRef<ButtonElement, ButtonProps>(
	({ size = 'medium', type = 'fill', submit, children, className, ...rest }, ref) => {
		return (
			<button
				type={submit ? 'submit' : 'button'}
				className={clsx(s.Button, className, `s.${size}`, `s.${type}`)}
				ref={ref}
				{...rest}
			>
				<span className={clsx(s.label, `s.${size}`)}>{children}</span>
			</button>
		);
	},
);

Button.displayName = 'Button';
