'use client'
import { ReactNode } from 'react'
import { AppProgressBar } from 'next-nprogress-bar'
export function ProgressBar({ children }: { children: ReactNode }) {
	return (
		<>
			<AppProgressBar color="#fff" options={{ showSpinner: false }} />
			{children}
		</>
	)
}
