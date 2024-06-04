import { type Locale, locales } from '@/utils/localse'
import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
	locales,
	defaultLocale: 'ru' satisfies Locale,
	localePrefix: 'never',
	pathnames: {
		'/': '/',
		'/catalog': '/catalog',
		'/catalog/[videoId]': '/catalog/[videoId]',
	},
})

export const config = {
	matcher: ['/', '/catalog/:videoId', '/([\\w-]+)?/catalog/([\\w-]+)'],
}
