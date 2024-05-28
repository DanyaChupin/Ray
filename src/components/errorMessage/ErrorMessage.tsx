import styles from './ErrorMessage.module.scss'

export function ErrorMessage({ error }: { error: string; redirect?: string }) {
	const reloadWindow = () => {
		window.location.reload()
	}
	return (
		<div className={styles['error__wrapper']}>
			<h1 className={styles['error__title']}>Что то пошло не так...</h1>
			<p className={styles['error__description']}>Ошибка:{error}</p>
			<button className={styles['error__button']} onClick={reloadWindow}>
				Презагрузить
			</button>
		</div>
	)
}
