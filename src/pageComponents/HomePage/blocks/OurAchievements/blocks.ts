interface Block {
	title: string;
	number: string;
	unit: string;
	id: number;
}

export const blocks: Block[] = [
	{ id: 1, title: 'Було видано наборів\nгуманітарної допомоги', number: '12 358', unit: 'шт' },
	{ id: 2, title: 'Було отримано\nгуманіарної допомоги', number: '264', unit: 'тонн' },
	{ id: 3, title: 'Нам\nзадонатили', number: '104 228', unit: 'UAH' },
];
