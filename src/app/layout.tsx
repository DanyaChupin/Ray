import type { Metadata, Viewport } from 'next'
import { fonts } from '../assets/static-fonts/fonts'
import '../assets/styles/globals.scss'

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
		<html lang="ru">
			<body className={fonts.className}>{children}</body>
		</html>
	)
}
