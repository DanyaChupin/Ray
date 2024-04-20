import { ReactNode } from 'react'
import styles from './Footer.module.scss'

export function Footer({ children }: { children: ReactNode }) {
	return <footer className={styles['footer']}>{children}</footer>
}
