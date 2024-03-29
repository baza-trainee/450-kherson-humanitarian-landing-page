import { forwardRef } from 'react';

import { clsx } from 'clsx';

import s from './Section.module.scss';

export type SectionElement = HTMLElement;

export type SectionProps = ReactHTMLElementAttributes<SectionElement>;

export const Section = forwardRef<SectionElement, SectionProps>(({ children, className, ...rest }, ref) => {
	const componentClass = [className, s.Section];
	return (
		<section className={clsx(componentClass)} ref={ref} {...rest}>
			{children}
		</section>
	);
});

Section.displayName = 'Section';
