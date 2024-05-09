import type { PropsWithChildren } from 'react'
import styles from './Layout.module.scss'
import { Header } from '@/components/header/Header'

export default function CatalogLayout({
	children,
}: PropsWithChildren<unknown>) {
	return (
		<div className={styles['layout']}>
			<Header />
			<section className={styles['layout__padding']}>{children}</section>
		</div>
	)
}
