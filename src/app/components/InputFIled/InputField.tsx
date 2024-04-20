import Image from 'next/image'
import styles from './InputField.module.scss'
import { InputHTMLAttributes } from 'react'

interface IFormInput extends InputHTMLAttributes<HTMLInputElement> {
	screenSize: boolean
	pathIcon: string
}

export function InputField({ screenSize, pathIcon, ...rest }: IFormInput) {
	return (
		<div className={styles['inputField__wrapper']}>
			{pathIcon && (
				<Image
					width={screenSize ? 24 : 16}
					height={screenSize ? 24 : 16}
					src={pathIcon}
					alt='иконка'
				/>
			)}
			<input {...rest} className={styles['inputField__input']} />
		</div>
	)
}
