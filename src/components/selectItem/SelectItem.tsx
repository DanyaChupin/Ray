import { IOption } from '../../shared/types/options.type'
import Image from 'next/image'
import Link from 'next/link'
import cn from 'classnames'
import styles from './SelectItem.module.scss'

interface ISelectItem {
	option: IOption
	pathIcon: string
	onClick?: () => void
	catalogStyle?: boolean
}

export function SelectItem({
	onClick,
	pathIcon,
	option,
	catalogStyle,
}: ISelectItem) {
	return (
		<li className={styles['select-item']}>
			<Link
				className={styles['select-item__link']}
				onClick={onClick && onClick}
				href={option.to}
			>
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
