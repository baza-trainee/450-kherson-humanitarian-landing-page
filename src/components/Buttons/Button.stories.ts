import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

const meta = {
	title: 'Button',
	component: Button,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
	argTypes: {
		onClick: () => console.log('click'),
	},
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		type: 'primary',
		disabled: false,
		submit: false,
		children: 'Primary',
	},
};

export const Secondary: Story = {
	args: {
		type: 'secondary',
		disabled: false,
		submit: false,
		children: 'Secondary',
	},
};
