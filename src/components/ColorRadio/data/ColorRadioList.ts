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
	},
];
