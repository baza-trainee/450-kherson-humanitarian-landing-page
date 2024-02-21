/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,
	env: {
		BASE_URL: process.env.BASE_URL,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '450kr.com',
			},
		],
	},
};

module.exports = nextConfig;
