import { forwardRef } from 'react';
import type { FieldErrors, FieldValues } from 'react-hook-form';

import clsx from 'clsx';

import { InputWrapper } from '../InputWrapper/InputWrapper';

import cs from '../commonStyle.module.scss';
import s from './TextArea.module.scss';

export type TextAreaElement = HTMLTextAreaElement;

export interface TextAreaProps extends React.HTMLProps<TextAreaElement> {
	label?: string;
	register?: FieldValues;
	errors?: FieldErrors<FieldValues>;
	required?: boolean;
	disabled?: boolean;
	showError?: boolean;
	infoMessage?: string;
	showInfo?: boolean;
}

export const TextArea = forwardRef<TextAreaElement, TextAreaProps>(
	(
		{
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
						<textarea
							className={clsx(cs.input, s.textArea, 'scroll')}
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

TextArea.displayName = 'TextArea';
