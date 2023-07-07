import { forwardRef } from 'react';

import clsx from 'clsx';

import s from './Icon.module.scss';

export type IconElement = HTMLDivElement;

export interface IconProps extends ReactHTMLElementAttributes<IconElement> {
	icon: string;
	colors?: {
		default?: string;
		hover?: string;
		click?: string;
		disabled?: string;
		disabledOpacity?: number;
	};
	size?: ComponentSizes;
	height?: string | number;
	width?: string | number;
	disabled?: boolean;
}

export const Icon = forwardRef<IconElement, IconProps>(
	({ icon, colors, size = 'default', width, height, disabled, onClick, className, style, ...rest }, ref) => {
		const componentClass = [onClick && s.clickable, disabled && s.disabled, size && s[size]];

		const customSizeStyle = size === 'custom' && width && height ? { width, height } : {};

		const customDefaultColorStyle = colors?.default ? { '--icon--background-color': colors?.default } : null;
		const customHoverColorStyle = colors?.hover ? { '--icon--background-color-hover': colors?.hover } : null;
		const customClickColorStyle = colors?.click ? { '--icon--background-color-click': colors?.click } : null;
		const customDisabledColorStyle = colors?.disabled
			? { '--icon--background-color-disabled': colors?.disabled }
			: null;
		const customDisabledOpacityColorStyle =
			colors?.disabledOpacity && colors?.disabledOpacity >= 0
				? { '--icon--background-color-disabled-opacity': `${colors?.disabledOpacity}%` }
				: null;

		const customColorStyle = {
			...customDefaultColorStyle,
			...customHoverColorStyle,
			...customClickColorStyle,
			...customDisabledColorStyle,
			...customDisabledOpacityColorStyle,
		};

		return (
			<span
				className={clsx(s.Icon, icon, className, componentClass)}
				onClick={onClick}
				ref={ref}
				style={
					{
						...style,
						...customColorStyle,
						...customSizeStyle,
					} as React.CSSProperties
				}
				{...rest}
			/>
		);
	},
);

Icon.displayName = 'Icon';
