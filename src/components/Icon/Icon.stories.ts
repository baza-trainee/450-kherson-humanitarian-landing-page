import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from './Icon';

const meta = {
	title: 'Icon',
	component: Icon,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
	argTypes: {
		onClick: () => console.log('click'),
	},
	args: {
		icon: 'icon--close',
	},
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		size: 'default',
	},
};

export const Tiny: Story = {
	args: {
		size: 'tiny',
	},
};

export const Small: Story = {
	args: {
		size: 'small',
	},
};

export const Medium: Story = {
	args: {
		size: 'medium',
	},
};

export const Large: Story = {
	args: {
		size: 'large',
	},
};

export const Extra: Story = {
	args: {
		size: 'extra',
	},
};
