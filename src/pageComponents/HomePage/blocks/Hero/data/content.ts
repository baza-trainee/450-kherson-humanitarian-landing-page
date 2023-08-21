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
	photo: string;
}

export const content: ContentItem[] = [
	{
		id: 1,
		title: {
			value: 'Надаємо гуманітарні набори потребуючим',
			color: 'blue',
		},
		subtitle: { value: 'м. Кривий Ріг', color: 'black' },
		photo: 'first',
	},
	{
		id: 2,
		title: {
			value: 'Забезпечуємо медичні заклади м. Кривий Ріг, Криворізького району та Херсонської області',
			color: 'white',
		},
		subtitle: { value: 'м. Кривий Ріг', color: 'white' },
		photo: 'second',
	},
	{
		id: 3,
		title: {
			value: 'Відбудовуємо зруйновані та пошкоджені об’єкти (Херсонська область)',
			color: 'white',
		},
		subtitle: { value: 'м. Кривий Ріг', color: 'white' },
		photo: 'third',
	},
];
