import Link from 'next/link'
import cn from 'classnames'
import { IOption } from '../../shared/types/options.type'
import styles from './SelectItem.module.scss'

export interface ISelectItem {
	option: IOption
	isLocalSearch: boolean
	onClick?: () => void
	catalogStyle?: boolean
	deleteOpportunity?: boolean
}

export function SelectItem({
	onClick,
	isLocalSearch,
	option,
	catalogStyle,
}: ISelectItem) {
	return (
		<li className={styles['select-item']} onClick={onClick && onClick}>
			<Link className={styles['select-item__link']} href={option.to}>
				{isLocalSearch ? (
					<svg
						className={cn(styles['select-item__icon'], {
							[styles['catalogIcon']]: catalogStyle,
						})}
						width="14"
						height="14"
						viewBox="0 0 14 14"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<circle cx="7" cy="7" r="6.5" stroke="white" />
						<path d="M7 3V7.5L9.5 8.5" fill="none" stroke="white" />
					</svg>
				) : (
					<svg
						className={cn(styles['select-item__icon'], {
							[styles['catalogIcon']]: catalogStyle,
						})}
						width="18"
						height="18"
						viewBox="0 0 18 18"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M16.6464 17.3537C16.8417 17.5489 17.1583 17.5489 17.3536 17.3537C17.5488 17.1584 17.5488 16.8418 17.3536 16.6466L16.6464 17.3537ZM12.7491 7.12468C12.7491 10.231 10.2309 12.7492 7.12456 12.7492V13.7492C10.7832 13.7492 13.7491 10.7833 13.7491 7.12468H12.7491ZM7.12456 12.7492C4.0182 12.7492 1.5 10.231 1.5 7.12468H0.5C0.5 10.7833 3.46592 13.7492 7.12456 13.7492V12.7492ZM1.5 7.12468C1.5 4.01832 4.0182 1.50012 7.12456 1.50012V0.500122C3.46592 0.500122 0.5 3.46604 0.5 7.12468H1.5ZM7.12456 1.50012C10.2309 1.50012 12.7491 4.01832 12.7491 7.12468H13.7491C13.7491 3.46604 10.7832 0.500122 7.12456 0.500122V1.50012ZM10.854 11.5613L16.6464 17.3537L17.3536 16.6466L11.5612 10.8542L10.854 11.5613Z"
							fill="white"
						/>
					</svg>
				)}

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
