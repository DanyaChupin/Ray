import { ReactNode } from 'react'
import cn from 'classNames'
import styles from './Select.module.scss'

interface ISelect {
	children: ReactNode
	isOpen: boolean
	catalogStyle?: boolean
}

export function Select({ isOpen, children, catalogStyle }: ISelect) {
	return (
		<div
			className={cn(styles['select-wrapper'], {
				[styles['open']]: isOpen,
			})}
		>
			<ul
				className={cn(styles['select'], {
					[styles['catalogSelect']]: catalogStyle,
				})}
			>
				{children}
			</ul>
		</div>
	)
}
