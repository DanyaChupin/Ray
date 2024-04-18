import Image from 'next/image'
import styles from './InputField.module.scss'
import { InputHTMLAttributes } from 'react'

interface IFormInput extends InputHTMLAttributes<HTMLInputElement> {
	screenSize: boolean
	icon: string
}

export function InputField({ screenSize, icon, ...rest }: IFormInput) {
	return (
		<div className={styles['inputField__wrapper']}>
			{icon && (
				<Image
					width={screenSize ? 24 : 16}
					height={screenSize ? 24 : 16}
					src={icon}
					alt='иконка'
				/>
			)}
			<input {...rest} className={styles['inputField__input']} />
		</div>
	)
}
