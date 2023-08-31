interface ColorPickField {
	name: string;
	value: string;
	id: string;
	text?: string;
	isChecked?: boolean;
}

interface ColorPickCollection {
	block: string;
	fieldList: ColorPickField[];
}

export const colorPickList: ColorPickCollection[] = [
	{
		block: 'imgShadow',
		fieldList: [
			{
				name: 'imgShadow',
				value: 'whiteShadow',
				id: 'whiteShadow',
				text: 'світлий градієнт',
				isChecked: true,
			},
			{
				name: 'imgShadow',
				value: 'darkShadow',
				id: 'darkShadow',
				text: 'темний градієнт',
			},
			{
				name: 'imgShadow',
				value: 'noShadow',
				id: 'noShadow',
				text: 'без градієнту',
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
