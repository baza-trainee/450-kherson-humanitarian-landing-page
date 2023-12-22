import type { FieldError } from 'react-hook-form';

import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from '~components/Icon/Icon';
import { Text } from '~components/Text/Text';

import { Checkbox } from './Checkbox';

const meta = {
	title: 'Inputs/Checkbox',
	component: Checkbox,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		text: 'I agree',
	},
};

export const FormUsage: Story = {
	args: {
		text: 'I agree',
		label: 'Label',
		required: true,
		register: { name: 'fieldName' },
		errors: { fieldName: { message: 'Some error message' } as FieldError },
		showError: true,
		disabled: false,
	},
};

export const CustomChildren: Story = {
	args: {
		text: '',
		children: (
			<Text
				variant="h4"
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: '4px',
					padding: '4px 8px',
					color: 'black',
					backgroundColor: 'yellow',
					borderRadius: '4px',
				}}
			>
				<Icon icon="icon--eye" size="tiny" /> custom
			</Text>
		),
	},
};
