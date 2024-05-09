import Image from 'next/image'
import { InputHTMLAttributes } from 'react'
import cn from 'classNames'
import styles from './InputField.module.scss'

interface IFormInput extends InputHTMLAttributes<HTMLInputElement> {
	pathIcon: string
	catalogStyle?: boolean
}

export function InputField({
	catalogStyle = false,
	pathIcon,
	...rest
}: IFormInput) {
	return (
		<div className={styles['inputField__wrapper']}>
			{pathIcon && (
				<Image
					className={cn(styles['inputField__icon'], {
						[styles['catalogImg']]: catalogStyle,
					})}
					width={16}
					height={16}
					loading="eager"
					src={pathIcon}
					priority
					alt="поиск"
					draggable={false}
				/>
			)}
			<input {...rest} className={styles['inputField__input']} />
		</div>
	)
}
