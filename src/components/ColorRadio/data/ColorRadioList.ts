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
		block: 'imageGradient',
		fieldList: [
			{
				name: 'imageGradient',
				value: 'lightGradient',
				id: 'lightGradient',
				isChecked: true,
			},
			{
				name: 'imageGradient',
				value: 'darkGradient',
				id: 'darkGradient',
			},
			{
				name: 'imageGradient',
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
	},
];
