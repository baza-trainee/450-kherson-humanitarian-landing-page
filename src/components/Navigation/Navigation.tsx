import { CustomLink } from '~components/Link/Link';

interface NavigationProps {
	variant: 'header' | 'footer';
	className: string;
}

export function Navigation({ variant, className }: NavigationProps) {
	return (
		<>
			<CustomLink href="#AboutUs" variant={variant} className={className}>
				Про нас
			</CustomLink>
			<CustomLink href="#OurActivity" variant={variant} className={className}>
				Наша діяльність
			</CustomLink>
			<CustomLink href="#Projects" variant={variant} className={className}>
				Проєкти
			</CustomLink>
			<CustomLink href="#OurPartners" variant={variant} className={className}>
				Наші партнери
			</CustomLink>
		</>
	);
}
