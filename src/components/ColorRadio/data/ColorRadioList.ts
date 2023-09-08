interface ColorRadioField {
	name: string;
	value: string;
	id: string;
	text?: string;
	isChecked?: boolean;
}

interface ColorRadioCollection {
	block: string;
	fieldList: ColorRadioField[];
}

export const ColorRadioList: ColorRadioCollection[] = [
	{
		block: 'imgGradient',
		fieldList: [
			{
				name: 'imgGradient',
				value: 'liteGradient',
				id: 'liteGradient',
				isChecked: true,
			},
			{
				name: 'imgGradient',
				value: 'darkGradient',
				id: 'darkGradient',
			},
			{
				name: 'imgGradient',
				value: 'noGradient',
				id: 'noGradient',
			},
		],
	},
	{
		block: 'textColor',
		fieldList: [
			{
				name: 'textColor',
				value: 'blue',
				id: 'blue',
				isChecked: true,
			},
			{
				name: 'textColor',
				value: 'black',
				id: 'black',
			},
			{
				name: 'textColor',
				value: 'white',
				id: 'white',
			},
		],
	}
];
