module.exports = {
	'./src/**/*.(js|jsx|ts|tsx)': (filenames) => `npx eslint ${filenames.join(' ')}`,
	'./src/**/*.{js,jsx,ts,tsx}': () => 'tsc --pretty --noEmit',
	'*': (filenames) => `prettier --check ${filenames.join(' ')}`,
};
