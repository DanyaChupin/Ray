import styles from './SkeletonCatalogItem.module.scss'

export function SkeletonCatalogItem() {
	return (
		<div className={styles['wrapper']}>
			<div className={styles['skeleton']}></div>
			<div className={styles['skeleton__text']}></div>
			<div className={styles['skeleton__text']}></div>
		</div>
	)
}
