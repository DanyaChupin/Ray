import type { PropsWithChildren } from 'react'

export default function GalleryLayout({
	children,
}: PropsWithChildren<unknown>) {
	return (
		<div>
			<h1>Header</h1>
			{children}
		</div>
	)
}
