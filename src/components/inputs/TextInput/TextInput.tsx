import { forwardRef } from 'react';
import type { FieldErrors, FieldValues } from 'react-hook-form';

import clsx from 'clsx';

import { InputWrapper } from '../InputWrapper/InputWrapper';

import cs from '../commonStyle.module.scss';

export type TextInputElement = HTMLInputElement;

export interface TextInputProps
	extends ReactHTMLElementAttributes<
		TextInputElement,
		React.InputHTMLAttributes<TextInputElement>
	> {
	label?: string;
	register?: FieldValues;
	errors?: FieldErrors<FieldValues>;
	required?: boolean;
	disabled?: boolean;
	hideError?: boolean;
	info?: string;
}

export const TextInput = forwardRef<TextInputElement, TextInputProps>(
	(
		{
			type = 'text',
			label,
			required,
			disabled,
			register,
			errors,
			hideError,
			info,
			placeholder,
			className,
			children,
			...rest
		},
		ref,
	) => {
		const error = errors ? errors[register?.name]?.message?.toString() : '';
		const componentClass = [error && cs.error, disabled && cs.disabled];
		const disabledClass = [disabled && cs.disabled];

		return (
			<label className={clsx(disabledClass, className)}>
				<InputWrapper
					label={label}
					error={error}
					required={required}
					disabled={disabled}
					className={clsx(componentClass)}
					showError={Boolean(errors && !hideError)}
					showInfo={!!info}
					info={info}
				>
					<input
						type={type}
						className={cs.input}
						placeholder={placeholder}
						ref={ref}
						{...register}
						{...rest}
					/>
					{children}
				</InputWrapper>
			</label>
		);
	},
);

TextInput.displayName = 'TextInput';
