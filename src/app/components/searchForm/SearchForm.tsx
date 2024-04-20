import { ReactNode } from 'react'
import styles from './SearchForm.module.scss'

export function SearchForm({ children }: { children: ReactNode }) {
	return <form className={styles['form']}>{children}</form>
}
