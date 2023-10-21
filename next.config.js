/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
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
