import type { Meta, StoryObj } from '@storybook/react';

import { Tabs } from './Tabs';

const meta = {
	title: 'Inputs/Tabs',
	component: Tabs,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
	argTypes: {
		register: { control: false },
		errors: { control: false },
	},
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		name: 'tabs',
		labels: ['tab1', 'tab2'],
		defaultValue: 'tab1',
		style: { width: 120 },
	},
};
