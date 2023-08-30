import { forwardRef, useState } from 'react';

import type { TextInputElement, TextInputProps } from './TextInput';
import { TextInput } from './TextInput';

export type TextInputWithCounterElement = TextInputElement;

export type TextInputWithCounterProps = Omit<TextInputProps, 'info'>;

export const TextInputWithCounter = forwardRef<TextInputWithCounterElement, TextInputWithCounterProps>(
	({ label, required, disabled, register, errors, placeholder, size, maxLength, className, ...rest }, ref) => {
		const [value, setValue] = useState('');

		const countMessage = `Символів ${value.length}/${maxLength}`;
		const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			const newValue = event.target.value;
			setValue(newValue);
		};

		return (
			<TextInput
				label={label}
				required={required}
				errors={errors}
				hideError={true}
				disabled={disabled}
				info={countMessage}
				placeholder={placeholder}
				size={size}
				maxLength={maxLength}
				register={register}
				onChange={handleInputChange}
				className={className}
				{...rest}
				ref={ref}
			/>
		);
	},
);

TextInputWithCounter.displayName = 'TextInputWithCounter';
