import { Catalog } from '@/components/catalog/Catalog'
import { Header } from '@/components/header/Header'
import styles from './Catalog.module.scss'

export default function CatalogPage() {
	return (
		<>
			<Header />
			<section className={styles['catalog']}>
				<Catalog />
				<button className={styles['catalog__fetchButton']}>
					ЗАГРУЗИТЬ ЕЩЕ
				</button>
			</section>
		</>
	)
}
