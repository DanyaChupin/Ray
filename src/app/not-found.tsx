'use client'
import styles from './NotFound.module.scss'
export default function NotFound() {
	return (
		<html lang="ru">
			<body className={styles['body']}>
				<div className={styles['notfound']}>
					<h1>Страница не найдена</h1>
				</div>
			</body>
		</html>
	)
}
