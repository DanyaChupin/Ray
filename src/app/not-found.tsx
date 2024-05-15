import { Logo } from '@/components/Logo/Logo'
import styles from './NotFound.module.scss'
import { BackLink } from '@/components/backLink/BackLink'

export default function NotFound() {
	return (
		<div className={styles['notFound']}>
			<Logo />
			<p className={styles['description']}>Страница не найдена </p>
			<BackLink returnBackUrl="/" />
		</div>
	)
}
