import { Logo } from '@/components/Logo/Logo'
import styles from './NotFound.module.scss'
import { BackLink } from '@/components/backLink/BackLink'
import { useTranslations } from 'next-intl'

export default function NotFound() {
	const t = useTranslations('root')
	return (
		<div className={styles['notFound']}>
			<Logo />
			<p className={styles['description']}>{t('notfound')}</p>
			<BackLink returnBackUrl="/" />
		</div>
	)
}
