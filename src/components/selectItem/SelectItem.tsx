import { IOption } from '../../shared/types/options.type'
import cn from 'classnames'
import Link from 'next/link'
import styles from './SelectItem.module.scss'
import Image from 'next/image'

export interface ISelectItem {
	option: IOption
	pathIcon: string
	onClick?: () => void
	catalogStyle?: boolean
	deleteOpportunity?: boolean
}

export function SelectItem({
	onClick,
	pathIcon,
	option,
	catalogStyle,
}: ISelectItem) {
	return (
		<li className={styles['select-item']} onClick={onClick && onClick}>
			<Link className={styles['select-item__link']} href={option.to}>
				<Image
					className={cn(styles['select-item__icon'], {
						[styles['catalogIcon']]: catalogStyle,
					})}
					width={16}
					height={16}
					src={pathIcon}
					loading="eager"
					alt="поиск"
					priority
				/>
				<p
					className={cn(styles['select-item__text'], {
						[styles['catalogText']]: catalogStyle,
					})}
				>
					{option.text}
				</p>
			</Link>
		</li>
	)
}
