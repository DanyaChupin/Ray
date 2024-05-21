'use client'
import { Header } from '@/components/header/Header'
import { Catalog } from '@/components/catalog/Catalog'
import styles from './Catalog.module.scss'
import { useGetFilms } from './useGetFilms'

export default async function CatalogPage() {
	const data = useGetFilms()
	return (
		<>
			<Header />
			<section className={styles['catalog']}>
				<Catalog data={data} />
				<button className={styles['catalog__fetchButton']}>
					ЗАГРУЗИТЬ ЕЩЕ
				</button>
			</section>
		</>
	)
}
