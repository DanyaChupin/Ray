'use client'
import { useState } from 'react'
import cn from 'classnames'
import styles from './ButtonLang.module.scss'

const LANG: 'RU' | 'EN' = 'RU'

export function ButtonLang() {
	const [lang, setLang] = useState(LANG)

	const changeLang = () => {
		if (lang === 'RU') {
			setLang('EN')
		} else {
			setLang('RU')
		}
	}
	return (
		<div className={styles['buttonLang']}>
			<button
				onClick={changeLang}
				className={cn(styles['button'], {
					[styles['bold']]: lang === 'RU',
				})}
			>
				RU
			</button>
			<span className={styles['separation']}>/</span>
			<button
				onClick={changeLang}
				className={cn(styles['button'], {
					[styles['bold']]: lang === 'EN',
				})}
			>
				EN
			</button>
		</div>
	)
}
