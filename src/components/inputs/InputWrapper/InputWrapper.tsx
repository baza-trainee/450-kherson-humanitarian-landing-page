import { forwardRef } from 'react';

import clsx from 'clsx';

import s from './InputWrapper.module.scss';

export type InputWrapperElement = HTMLDivElement;

export interface InputWrapperCommonProps {
	label?: string;
	required?: boolean;
	disabled?: boolean;
	showError?: boolean;
}

interface InputWrapperProps
	extends ReactHTMLElementAttributes<InputWrapperElement>,
		InputWrapperCommonProps {
	isError?: boolean;
	errorMessage?: string;
	infoMessage?: string;
	showInfo?: boolean;
}

const NON_BREAKING_SPACE = '\xA0';

export const InputWrapper = forwardRef<InputWrapperElement, InputWrapperProps>(
	(
		{
			label,
			required,
			disabled,
			isError,
			className,
			errorMessage,
			showError,
			infoMessage,
			showInfo,
			children,
			...rest
		},
		ref,
	) => {
		const containerClass = [isError && s.error, disabled && s.disabled];
		const labelString = label && label?.trim().length > 0 ? label : NON_BREAKING_SPACE;

		return (
			<div className={clsx(s.InputWrapper, containerClass, className)} ref={ref} {...rest}>
				{label && (
					<div className={s.label}>
						<p className={s.labelText}>
							{labelString}
							{required && label.trim().length > 0 && (
								<span className={s.labelRequired}>*</span>
							)}
						</p>
					</div>
				)}
				<div className={s.inputBlockContainer}>
					{children}
					{showError && <p className={clsx(s.infoText, s.errorText)}>{errorMessage}</p>}
					{showInfo && <p className={s.infoText}>{infoMessage}</p>}
				</div>
			</div>
		);
	},
);

InputWrapper.displayName = 'InputWrapper';
