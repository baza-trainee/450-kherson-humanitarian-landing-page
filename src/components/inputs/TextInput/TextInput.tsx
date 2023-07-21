import { forwardRef } from 'react';
import type { FieldErrors, FieldValues } from 'react-hook-form';

import clsx from 'clsx';

import { InputWrapper } from '../InputWrapper/InputWrapper';

import cs from '../commonStyle.module.scss';

export type TextInputElement = HTMLInputElement;

export interface TextInputProps extends ReactHTMLElementAttributes<TextInputElement> {
	label?: string;
	register?: FieldValues;
	errors?: FieldErrors<FieldValues>;
	required?: boolean;
	disabled?: boolean;
}

export const TextInput = forwardRef<TextInputElement, TextInputProps>(
	({ label, required, disabled, register, errors, placeholder, className, ...rest }, ref) => {
		const error = errors ? errors[register?.name]?.message?.toString() : '';
		const componentClass = [error && cs.error, disabled && cs.disabled];

		return (
			<label className={className}>
				<InputWrapper
					label={label}
					error={error}
					required={required}
					disabled={disabled}
					className={clsx(componentClass)}
					showError={!!errors}
				>
					<input type="text" className={cs.input} placeholder={placeholder} ref={ref} {...register} {...rest} />
				</InputWrapper>
			</label>
		);
	},
);

TextInput.displayName = 'TextInput';
