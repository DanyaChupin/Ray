import Image from 'next/image'
import { InputHTMLAttributes } from 'react'
import cn from 'classnames'
import styles from './InputField.module.scss'

interface IFormInput extends InputHTMLAttributes<HTMLInputElement> {
	catalogStyle?: boolean
	isLoading: boolean
}

export function InputField({
	catalogStyle = false,
	isLoading,
	...rest
}: IFormInput) {
	return (
		<div className={styles['inputField__wrapper']}>
			<Image
				className={cn(styles['inputField__icon'], {
					[styles['catalogImg']]: catalogStyle,
					[styles['loading']]: isLoading,
				})}
				width={16}
				height={16}
				loading="eager"
				src="./images/search.svg"
				priority
				alt="поиск"
				draggable={false}
			/>
			<input {...rest} className={styles['inputField__input']} />
		</div>
	)
}
