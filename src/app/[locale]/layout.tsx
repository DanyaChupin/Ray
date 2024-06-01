import type { Metadata, Viewport } from 'next'
import { fonts } from '../../assets/static-fonts/fonts'
import { ProgressBar } from '@/context/ProgressBar'
import { type Locale } from '@/utils/localse'
import { ReactQueryClientProvider } from '@/context/ReactQueryClientProvider'
import { getMessages, getTranslations } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import '../../assets/styles/globals.scss'

export const viewport: Viewport = {
	themeColor: 'black',
	viewportFit: 'cover',
	userScalable: false,
	initialScale: 1,
}

type Props = {
	children: React.ReactNode
	params: {
		local: Locale
	}
}
export default async function Layout({ children, params }: Props) {
	const messages = await getMessages()
	return (
		<html lang={params.local}>
			<body className={fonts.className}>
				<ProgressBar>
					<ReactQueryClientProvider>
						<NextIntlClientProvider messages={messages}>
							{children}
						</NextIntlClientProvider>
					</ReactQueryClientProvider>
				</ProgressBar>
			</body>
		</html>
	)
}

export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: Locale }
}): Promise<Metadata> {
	const t = await getTranslations({ locale, namespace: 'root' })

	return {
		title: {
			default: t('metadata.title'),
			template: `${t('metadata.title')} - %s`,
		},
		description: t('metadata.description'),
		icons: {
			icon: ['/favicon.ico?v=4'],
		},
	}
}
