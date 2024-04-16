import localFonts from 'next/font/local'

export const fonts = localFonts({
	display: 'swap',
	variable: '--font-arial',
	src: [
		{
			path: './static-fonts/ArialBold.ttf',
			weight: '700',
			style: 'normal',
		},
		{
			path: './static-fonts/ArialRegular.ttf',
			weight: '400',
			style: 'normal',
		},
	],
})
