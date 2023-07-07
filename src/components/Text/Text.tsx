import React from 'react';
import { forwardRef } from 'react';

import clsx from 'clsx';

import s from './Text.module.scss';

const variantsMapping = {
	h1: 'h1',
	h2: 'h2',
	h3: 'h3',
	h4: 'h4',
	subtitle: 'h6',
	p: 'p',
	button: 'span',
	header: 'p',
	footer: 'p',
	various1: 'p',
	various2: 'p',
	various3: 'p',
};

type TextVariants = 'h1' | 'h2' | 'h3' | 'h4' | 'h6' | 'p' | 'span';

export type TextElement = HTMLHeadingElement | HTMLParagraphElement;

export interface TextProps extends Omit<ReactHTMLElementAttributes<TextElement>, 'ref'> {
	variant?: keyof typeof variantsMapping;
}

export const Text = forwardRef<TextElement, TextProps>(({ variant, children, className, ...rest }, ref) => {
	const Component = (variant ? variantsMapping[variant] : 'span') as TextVariants;

	const componentClass = variant && s[variant];

	return (
		<Component className={clsx(s.Text, componentClass, className)} ref={ref} {...rest}>
			{children}
		</Component>
	);
});

Text.displayName = 'Text';
