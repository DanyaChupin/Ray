import { ReactNode } from 'react'
import cn from 'classnames'
import styles from './FlexBox.module.scss'

interface IFlexBox {
	children: ReactNode
	column: boolean
	center: boolean
}
export function FlexBox({ children, column, center }: IFlexBox) {
	return (
		<div
			className={cn(styles['flex'], {
				[styles['column']]: column,
				[styles['center']]: center,
			})}
		>
			{children}
		</div>
	)
}
