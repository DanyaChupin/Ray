'use client'
import { Suspense } from 'react'
import { CatalogItem } from '../catalogItem/CatalogItem'
import styles from './Catalog.module.scss'

export async function Catalog(data: any) {
	const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11, 1]
	console.log(data)
	return (
		<div className={styles['catalog']}>
			{arr.map((elem) => (
				<Suspense fallback={<p>Loading...</p>}>
					<CatalogItem elem={elem} />
				</Suspense>
			))}
		</div>
	)
}
