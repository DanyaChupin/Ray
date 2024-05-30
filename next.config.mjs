import createNextIntPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntPlugin()
/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['vod.api.video'],
	},
	poweredByHeader: false,
}

export default withNextIntl(nextConfig)
