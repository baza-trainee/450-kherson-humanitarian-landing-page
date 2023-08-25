export interface ContentItem {
	id: number;
	title: {
		value: string;
		color: string;
	};
	subtitle: {
		value: string;
		color: string;
	};
	banner: { src: string; gradientColor: 'gradientWhite' | 'gradientBlack' };
}

export const content: ContentItem[] = [
	{
		id: 1,
		title: {
			value: 'Надаємо\nгуманітарні набори\nпотребуючим',
			color: 'blue',
		},
		subtitle: { value: 'м. Кривий Ріг', color: 'black' },
		banner: { src: '/hero/banner-1.jpg', gradientColor: 'gradientWhite' },
	},
	{
		id: 2,
		title: {
			value: 'Забезпечуємо медичні заклади м. Кривий Ріг, Криворізького району та Херсонської області',
			color: 'white',
		},
		subtitle: { value: 'м. Кривий Ріг', color: 'white' },
		banner: { src: '/hero/banner-2.jpg', gradientColor: 'gradientBlack' },
	},
	{
		id: 3,
		title: {
			value: 'Відбудовуємо зруйновані та пошкоджені об’єкти (Херсонська область)',
			color: 'white',
		},
		subtitle: { value: 'м. Кривий Ріг', color: 'white' },
		banner: { src: '/hero/banner-3.jpg', gradientColor: 'gradientBlack' },
	},
];
