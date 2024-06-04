import { type Locale, locales } from '@/utils/localse'
import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
	locales,
	defaultLocale: 'ru' satisfies Locale,
	localePrefix: 'never',
})

export const config = {
	matcher: ['/', '/catalog/:path*', '/([\\w-]+)?/catalog/([\\w-]+)'],
}
