// import { notFound } from 'next/navigation'
// import { getRequestConfig } from 'next-intl/server'

// const locales = ['en', 'ru']

// export default getRequestConfig(async ({ locale }) => {
// 	if (!locales.includes(locale as any)) notFound()

// 	return {
// 		messages: (await import(`../messages/${locale}.json`)).default,
// 	}
// })
import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async ({ locale = 'ru' }) => {
	// Provide a static locale, fetch a user setting,
	// read from `cookies()`, `headers()`, etc.
	// const locales = ['en','ru'];

	return {
		locale,
		messages: (await import(`../messages/${locale}.json`)).default,
	}
})
