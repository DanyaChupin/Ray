'use client'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { Locale } from '@/utils/localse'
import cn from 'classnames'
import styles from './ButtonLang.module.scss'
import { useTransition } from 'react'

export function ButtonLang() {
	const [isPrendig, startTransition] = useTransition()
	const locale = useLocale() as Locale
	const router = useRouter()

	function handleLocaleChange(newLocale: Locale): void {
		document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`
		startTransition(() => {
			router.refresh()
		})
	}

	const changeLang = () => {
		if (locale === 'ru') {
			handleLocaleChange('en')
		} else {
			handleLocaleChange('ru')
		}
	}

	return (
		<button
			className={styles['buttonLang']}
			disabled={isPrendig}
			onClick={changeLang}
		>
			<span
				className={cn(styles['button'], {
					[styles['bold']]: locale === 'ru',
				})}
			>
				RU
			</span>
			<span className={styles['separation']}>/</span>
			<span
				className={cn(styles['button'], {
					[styles['bold']]: locale === 'en',
				})}
			>
				EN
			</span>
		</button>
	)
}
