import type { Meta, StoryObj } from '@storybook/react';

import { Text } from './Text';

const meta = {
	title: 'Text',
	component: Text,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
	argTypes: {
		variant: { control: '' },
	},
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const H1: Story = {
	args: {
		children: 'Heading 1',
		variant: 'h1',
	},
};

export const H2: Story = {
	args: {
		children: 'Heading 2',
		variant: 'h2',
	},
};

export const H3: Story = {
	args: {
		children: 'Heading 3',
		variant: 'h3',
	},
};

export const H4: Story = {
	args: {
		children: 'Heading 4',
		variant: 'h4',
	},
};

export const H5: Story = {
	args: {
		children: 'Heading 5',
		variant: 'h5',
	},
};

export const H6: Story = {
	args: {
		children: 'Heading 6',
		variant: 'h6',
	},
};

export const Subtitle: Story = {
	args: {
		children: 'Subtitle',
		variant: 'subtitle',
	},
};

export const P: Story = {
	args: {
		children: 'Paragraph',
		variant: 'p',
	},
};

export const Button: Story = {
	args: {
		children: 'Button',
		variant: 'button',
	},
};

export const Header: Story = {
	args: {
		children: 'Header',
		variant: 'header',
	},
};

export const Footer: Story = {
	args: {
		children: 'Footer',
		variant: 'footer',
	},
};

export const Various1: Story = {
	args: {
		children: 'Various1',
		variant: 'various1',
	},
};

export const Various2: Story = {
	args: {
		children: 'Various 2',
		variant: 'h6',
	},
};

export const Various3: Story = {
	args: {
		children: 'Various 3',
		variant: 'various3',
	},
};
