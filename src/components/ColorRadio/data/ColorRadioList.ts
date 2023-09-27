interface ColorRadioField {
	name: string;
	value: string;
	id: string;
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
		block: 'titleColor',
		fieldList: [
			{
				name: 'titleColor',
				value: 'blue',
				id: 'titleColorBlue',
				isChecked: true,
			},
			{
				name: 'titleColor',
				value: 'black',
				id: 'titleColorBlack',
			},
			{
				name: 'titleColor',
				value: 'white',
				id: 'titleColorWhite',
			},
		],
	},
	{
		block: 'subtitleColor',
		fieldList: [
			{
				name: 'subtitleColor',
				value: 'blue',
				id: 'subtitleColorBlue',
				isChecked: true,
			},
			{
				name: 'subtitleColor',
				value: 'black',
				id: 'subtitleColorBlack',
			},
			{
				name: 'subtitleColor',
				value: 'white',
				id: 'subtitleColorWhite',
			},
		],
	}
];
