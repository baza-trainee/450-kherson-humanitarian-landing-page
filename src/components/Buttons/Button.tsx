import { forwardRef } from 'react';

import clsx from 'clsx';

import { Text } from '~components/Text/Text';

import s from './Button.module.scss';

type ButtonElement = HTMLButtonElement;

export interface ButtonProps extends React.HTMLAttributes<ButtonElement> {
	type?: 'primary' | 'secondary';
	disabled?: boolean;
	submit?: boolean;
}

export const Button = forwardRef<ButtonElement, ButtonProps>(
	({ type = 'primary', disabled, submit, children, className, ...rest }, ref) => {
		const componentClass = [type && s[type], disabled && `${s.disabled}`];
		return (
			<button
				type={submit ? 'submit' : 'button'}
				className={clsx(s.Button, className, componentClass)}
				disabled={disabled}
				ref={ref}
				{...rest}
			>
				<Text variant="button" className={s.label}>
					{children}
				</Text>
			</button>
		);
	},
);

Button.displayName = 'Button';
