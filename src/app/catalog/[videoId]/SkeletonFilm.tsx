import styles from './SkeletonFilm.module.scss'

export function SkeletonFilm() {
	return (
		<>
			<div className={styles['skeleton']}></div>
			<div className={styles['skeleton__flex']}>
				<div className={styles['skeleton__text']}></div>
				<div className={styles['skeleton__text']}></div>
			</div>
		</>
	)
}
