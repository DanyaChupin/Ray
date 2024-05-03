import Image from 'next/image'
import { InputHTMLAttributes } from 'react'
import styles from './InputField.module.scss'

interface IFormInput extends InputHTMLAttributes<HTMLInputElement> {
	pathIcon: string
}

export function InputField({ pathIcon, ...rest }: IFormInput) {
	return (
		<div className={styles['inputField__wrapper']}>
			{pathIcon && (
				<Image
					className={styles['inputField__icon']}
					width={16}
					height={16}
					src={pathIcon}
					priority
					alt='иконка'
					draggable={false}
				/>
			)}
			<input {...rest} className={styles['inputField__input']} />
		</div>
	)
}
