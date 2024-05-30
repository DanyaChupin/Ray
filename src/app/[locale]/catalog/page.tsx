import { Header } from '@/components/header/Header'
import { Catalog } from '@/components/catalog/Catalog'
import styles from './Catalog.module.scss'

export default function CatalogPage() {
	return (
		<>
			<Header />
			<section className={styles['catalog']}>
				<Catalog />
			</section>
		</>
	)
}
