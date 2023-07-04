import { H1, H2, H3, P1, P2, P3, P4, P5, P6 } from './variants';

interface TextProps {
	variant: 'h1' | 'h2' | 'h3' | 'p1' | 'p2' | 'p3' | 'p4' | 'p5' | 'p6';
	className?: string;
	children: string;
}

export function Text({ variant, className, children, ...props }: TextProps) {
	switch (variant) {
		case 'h1':
			return (
				<H1 className={`${className}`} {...props}>
					{children}
				</H1>
			);
		case 'h2':
			return (
				<H2 className={`${className}`} {...props}>
					{children}
				</H2>
			);
		case 'h3':
			return (
				<H3 className={`${className}`} {...props}>
					{children}
				</H3>
			);
		case 'p1':
			return (
				<P1 className={`${className}`} {...props}>
					{children}
				</P1>
			);
		case 'p2':
			return (
				<P2 className={`${className}`} {...props}>
					{children}
				</P2>
			);
		case 'p3':
			return (
				<P3 className={`${className}`} {...props}>
					{children}
				</P3>
			);
		case 'p4':
			return (
				<P4 className={`${className}`} {...props}>
					{children}
				</P4>
			);
		case 'p5':
			return (
				<P5 className={`${className}`} {...props}>
					{children}
				</P5>
			);
		case 'p6':
			return (
				<P6 className={`${className}`} {...props}>
					{children}
				</P6>
			);
		default:
			null;
	}
}
