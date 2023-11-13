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
	showError?: boolean;
	infoMessage?: string;
	showInfo?: boolean;
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
			showError,
			infoMessage,
			showInfo,
			placeholder,
			className,
			children,
			...rest
		},
		ref,
	) => {
		const isError = errors?.[register?.name] ? true : false;
		const errorMessage = errors?.[register?.name]?.message?.toString() || '';

		const componentClass = [isError && cs.error, disabled && cs.disabled];
		const disabledClass = [disabled && cs.disabled];

		return (
			<label className={clsx(disabledClass, className)}>
				<InputWrapper
					label={label}
					isError={isError}
					required={required}
					disabled={disabled}
					className={clsx(componentClass)}
					errorMessage={errorMessage}
					showError={showError}
					infoMessage={infoMessage || ''}
					showInfo={showInfo}
				>
					<div className={cs.inputContainer}>
						<input
							type={type}
							className={cs.input}
							placeholder={placeholder}
							ref={ref}
							{...register}
							{...rest}
						/>
						{children}
					</div>
				</InputWrapper>
			</label>
		);
	},
);

TextInput.displayName = 'TextInput';
