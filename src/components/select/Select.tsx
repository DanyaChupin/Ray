import { ReactNode } from 'react'
import cn from 'classnames'
import styles from './Select.module.scss'

interface ISelect {
	children: ReactNode
	isOpen: boolean
}

export function Select({ isOpen, children }: ISelect) {
	return (
		<div
			className={cn(styles['select-wrapper'], {
				[styles['open']]: isOpen,
			})}
		>
			<ul className={styles['select']}>{children}</ul>
		</div>
	)
}
