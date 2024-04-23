import { IOption } from '@/shared/types/options.type'
import Image from 'next/image'
import Link from 'next/link'
import styles from './SelectItem.module.scss'

interface ISelectItem {
	option: IOption
	screenSize: boolean
	pathIcon: string
	onClick?: () => void
}

/* change color svg */
export function SelectItem({
	onClick,
	screenSize,
	pathIcon,
	option,
}: ISelectItem) {
	return (
		<li className={styles['select-item']}>
			<Link
				className={styles['select-item__link']}
				onClick={onClick && onClick}
				href={option.to}
			>
				<Image
					className={styles['select-item__icon']}
					width={screenSize ? 24 : 16}
					height={screenSize ? 24 : 16}
					style={{ color: '#4r321w' }}
					src={pathIcon}
					alt='иконка'
				/>
				<p className={styles['select-item__text']}>{option.text}</p>
			</Link>
		</li>
	)
}
