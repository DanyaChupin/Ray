import { IOption } from '@/shared/types/options.type'
import Image from 'next/image'
import Link from 'next/link'
import styles from './SelectItem.module.scss'

interface ISelectItem {
	option: IOption
	pathIcon: string
	onClick?: () => void
}

/* change color svg */
export function SelectItem({ onClick, pathIcon, option }: ISelectItem) {
	return (
		<li className={styles['select-item']}>
			<Link
				className={styles['select-item__link']}
				onClick={onClick && onClick}
				href={option.to}
			>
				<Image
					className={styles['select-item__icon']}
					width={16}
					height={16}
					src={pathIcon}
					alt='поиск'
				/>
				<p className={styles['select-item__text']}>{option.text}</p>
			</Link>
		</li>
	)
}
