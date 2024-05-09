import { Catalog } from '@/components/catalog/Catalog'
import styles from './Catalog.module.scss'

export default function CatalogPage() {
	return (
		<div className={styles['catalog']}>
			<Catalog />
			<button className={styles['catalog__fetchButton']}>ЗАГРУЗИТЬ ЕЩЕ</button>
		</div>
	)
}
