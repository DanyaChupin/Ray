import { useTranslations } from 'next-intl'
import styles from './ErrorMessage.module.scss'

export function ErrorMessage({ error }: { error: string; redirect?: string }) {
	const reloadWindow = () => {
		window.location.reload()
	}

	const t = useTranslations('root')
	return (
		<div className={styles['error__wrapper']}>
			<h1 className={styles['error__title']}>{t('errortitle')}</h1>
			<p className={styles['error__description']}>
				{t('error')}:{error}
			</p>
			<button className={styles['error__button']} onClick={reloadWindow}>
				{t('reload')}
			</button>
		</div>
	)
}
