import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: [
			's-dt2.cloud.edgecore.ru',
			'139815.edgelive.co',
			'demopage.edgevideo.ru',
		],
	},
	env: {
		NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
		NEXT_PUBLIC_SERVER: process.env.NEXT_PUBLIC_SERVER,
	},
	poweredByHeader: false,
}

export default withNextIntl(nextConfig)
