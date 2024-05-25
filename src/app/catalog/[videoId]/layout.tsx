import { PropsWithChildren } from 'react'
import styles from './Layout.module.scss'

export default function CatalogLayout({
	children,
}: PropsWithChildren<unknown>) {
	return <div className={styles['layout__padding']}>{children}</div>
}
