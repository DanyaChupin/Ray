import { IOption } from '../../shared/types/options.type'
import Image from 'next/image'
import cn from 'classnames'
import styles from './SelectItem.module.scss'
import { useRouter } from 'next/navigation'

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
	const router = useRouter()
	const navigate = () => {
		router.push(option.to)
	}
	return (
		<li className={styles['select-item']} onClick={onClick && onClick}>
			<div className={styles['select-item__link']} onClick={navigate}>
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
			</div>
		</li>
	)
}
