import type { Metadata, Viewport } from 'next'
import { fonts } from '../assets/static-fonts/fonts'
import '../assets/styles/globals.scss'
import { ProgressBar } from '@/context/ProgressBar'
import { ReactQueryClientProvider } from '@/context/ReactQueryClientProvider'

export const viewport: Viewport = {
	themeColor: 'black',
	viewportFit: 'cover',
	userScalable: false,
	initialScale: 1,
}

export const metadata: Metadata = {
	title: 'Луч',
	description: 'Киносайт с авторским кино.',
	icons: {
		icon: ['/favicon.ico?v=4'],
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<ReactQueryClientProvider>
			<html lang="ru">
				<body className={fonts.className}>
					<ProgressBar>{children}</ProgressBar>
				</body>
			</html>
		</ReactQueryClientProvider>
	)
}
