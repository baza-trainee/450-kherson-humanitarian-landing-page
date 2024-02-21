import type { FieldError } from 'react-hook-form';

import type { Meta, StoryObj } from '@storybook/react';

import { TextInput } from './TextInput';

const meta = {
	title: 'Inputs/TextInput',
	component: TextInput,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
	argTypes: {
		register: { control: false },
		errors: {
			control: { type: 'boolean' },
			mapping: {
				false: {},
				true: { fieldName: { message: 'Some error message' } as FieldError },
			},
		},
		// info: {
		// 	control: {
		// 		type: 'select',
		// 	},
		// 	mapping: {
		// 		false: 'cc',
		// 		true: 'Some Info',
		// 	},
		// },
	},
} satisfies Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		style: { width: 300 },
		placeholder: 'Placeholder',
	},
};

export const FormUsage: Story = {
	args: {
		label: 'Label',
		required: true,
		disabled: false,
		placeholder: 'Placeholder',
		style: { width: 300 },
		register: { name: 'fieldName' },
		errors: {},
		showError: true,
		infoMessage: '',
	},
};

// import type { FieldError } from 'react-hook-form';

// import type { Meta, StoryObj } from '@storybook/react';

// import { TextInput } from './TextInput';

// const meta = {
// 	title: 'Inputs/TextInput',
// 	component: TextInput,
// 	parameters: { layout: 'centered' },
// 	tags: ['autodocs'],
// 	argTypes: {
// 		register: { control: false },
// 		// errors: {
// 		// 	options: [null, { fieldName: { message: 'Some error message' } as FieldError }],
// 		// 	control: { type: 'inline-radio' },
// 		// },
// 		errors: {
// 			defaultValue: 'null',
// 			control: { type: 'inline-radio' },
// 			options: ['null', 'error'],
// 			mapping: {
// 				null: {},
// 				error: { fieldName: { message: 'Some error message' } as FieldError },
// 			},
// 			// table: {
// 			// 	type: { summary: 'inline-radio' },
// 			// 	defaultValue: { summary: 'null' },
// 			// },
// 		},
// 	},
// } satisfies Meta<typeof TextInput>;

// export default meta;

// type Story = StoryObj<typeof meta>;

// export const Default: Story = {
// 	args: {
// 		style: { width: 220 },
// 		placeholder: 'Placeholder',
// 	},
// };

// export const FormUsage: Story = {
// 	args: {
// 		label: 'Label',
// 		required: true,
// 		disabled: false,
// 		placeholder: 'Placeholder',
// 		style: { width: 220 },
// 		register: { name: 'fieldName' },
// 		errors: { fieldName: { message: 'Some error message' } as FieldError },
// 	},
// };
