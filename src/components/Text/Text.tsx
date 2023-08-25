import React, { forwardRef } from 'react';

import clsx from 'clsx';

import s from './Text.module.scss';

const variantsMapping = {
	h1: 'h1',
	h2: 'h2',
	h3: 'h3',
	h4: 'h4',
	h5: 'h5',
	h6: 'h6',
	subtitle: 'h6',
	p: 'p',
	button: 'span',
	header: 'p',
	footer: 'p',
	various1: 'p',
	various2: 'p',
	various3: 'p',
};

export type TextVariants = keyof typeof variantsMapping;

type ComponentVariants = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

export type TextElement = HTMLHeadingElement | HTMLParagraphElement;

export interface TextProps extends Omit<ReactHTMLElementAttributes<TextElement>, 'ref'> {
	variant?: TextVariants;
	lineBreak?: boolean;
}

export function splitTextByBr(text: string): React.ReactNode {
	return text.split('\n').map((textLine, i) => (
		<React.Fragment key={i}>
			{textLine}
			<br />
		</React.Fragment>
	));
}

export const Text = forwardRef<TextElement, TextProps>(({ variant, lineBreak, children, className, ...rest }, ref) => {
	const Component = (variant ? variantsMapping[variant] : 'span') as ComponentVariants;

	const componentClass = variant && s[variant];

	return (
		<Component className={clsx(s.Text, componentClass, className)} ref={ref} {...rest}>
			{lineBreak ? splitTextByBr(String(children)) : children}
		</Component>
	);
});

Text.displayName = 'Text';
