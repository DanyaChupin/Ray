import type { Metadata } from 'next'
import { fonts } from '../assets/static-fonts/fonts'
import '../assets/styles/globals.scss'
import type { Viewport } from 'next'

export const viewport: Viewport = {
	themeColor: 'black',
	viewportFit: 'cover',
	userScalable: false,
	initialScale: 0,
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
		<html lang="ru">
			<body className={fonts.className}>{children}</body>
		</html>
	)
}
