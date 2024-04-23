import { ReactNode } from 'react'
import cn from 'classnames'
import styles from './FlexBox.module.scss'

interface IFlexBox {
	children: ReactNode
	column: boolean
}
export function FlexBox({ children, column }: IFlexBox) {
	return (
		<div
			className={cn(styles['flex'], {
				[styles['column']]: column,
			})}
		>
			{children}
		</div>
	)
}
