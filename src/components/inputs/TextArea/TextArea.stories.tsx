import type { FieldError } from 'react-hook-form';

import type { Meta, StoryObj } from '@storybook/react';

import { TextArea } from './TextArea';

const meta = {
	title: 'Inputs/TextArea',
	component: TextArea,
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
} satisfies Meta<typeof TextArea>;

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
		rows: 5,
	},
};
