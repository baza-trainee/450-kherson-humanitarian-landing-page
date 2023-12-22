import type { FieldError } from 'react-hook-form';

import type { Meta, StoryObj } from '@storybook/react';

import { TextInputWithCounter } from './TextInputWithCounter';

const meta = {
	title: 'Inputs/TextInputWithCounter',
	component: TextInputWithCounter,
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
	},
} satisfies Meta<typeof TextInputWithCounter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FormUsage: Story = {
	args: {
		label: 'Label',
		required: true,
		disabled: false,
		placeholder: 'Placeholder',
		style: { width: 300 },
		register: { name: 'fieldName' },
		errors: {},
		maxLength: 6,
	},
};
