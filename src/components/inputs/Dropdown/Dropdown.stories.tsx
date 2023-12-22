import type { FieldError } from 'react-hook-form';

import type { Meta, StoryObj } from '@storybook/react';

import { Dropdown } from './Dropdown';

const meta = {
	title: 'Inputs/Dropdown',
	component: Dropdown,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
	argTypes: {
		register: { control: false },
		errors: { control: false },
	},
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

const options = ['option 1', 'option 2', 'option 3'];

export const Default: Story = {
	args: {
		style: { width: 120 },
		options,
	},
};

export const FormUsage: Story = {
	args: {
		label: 'Label',
		options,
		required: true,
		disabled: false,
		style: { width: 120 },
		register: { name: 'fieldName' },
		errors: { fieldName: { message: 'Some error message' } as FieldError },
		defaultValue: 'option 2',
	},
};
