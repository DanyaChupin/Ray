import { CatalogItem } from '../catalogItem/CatalogItem'
import styles from './Catalog.module.scss'

export function Catalog() {
	const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11, 1]
	return (
		<div className={styles['catalog']}>
			{arr.map((elem) => (
				<CatalogItem />
			))}
		</div>
	)
}
