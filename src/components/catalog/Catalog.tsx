'use client'
import { CatalogItem } from '../catalogItem/CatalogItem'
import { SkeletonCatalogItem } from '../catalogItem/SkeletonCatalogItem'
import { useFilms } from './useFilms'
import styles from './Catalog.module.scss'
import { useSearchParams } from 'next/navigation'
import { useFilmSearch } from '../header/useFilmSearch'
import { ErrorMessage } from '../errorMessage/ErrorMessage'
import { useEffect } from 'react'
import { filmQuantityCatalog } from '@/utils/constants'

const elemLoading = Array(filmQuantityCatalog).fill('')

export function Catalog() {
	const searchParams = useSearchParams()
	const searchParam = searchParams.get('search')

	const { data, isLoading, fetchNextPage, isError, isFetchingNextPage, error } =
		useFilms(searchParam || '')

	const {
		searchData,
		searchRefetch,
		searchIsError,
		searchIsLoading,
		searchError,
	} = useFilmSearch(searchParam || '', 'searchCatalog')

	useEffect(() => {
		if (searchParam) {
			searchRefetch()
		}
	}, [searchParam, searchRefetch])

	if (searchIsError) {
		return <ErrorMessage error={searchError?.message || ''} />
	}

	if (isError) {
		return <ErrorMessage error={error?.message || ''} />
	}

	return (
		<>
			<div className={styles['catalog']}>
				{data?.pages &&
					!searchParam &&
					data.pages.map((page) =>
						page.map((film) => <CatalogItem film={film} key={film.videoId} />)
					)}
				{!searchData?.data.length && searchParam && !searchIsLoading ? (
					<div>Ничего не найдено</div>
				) : (
					searchData?.data.map((film) => (
						<CatalogItem film={film} key={film.videoId} />
					))
				)}
				{(isLoading || isFetchingNextPage || searchIsLoading) && (
					<>
						{elemLoading.map((_elem, index) => (
							<SkeletonCatalogItem key={index} />
						))}
					</>
				)}
			</div>

			{data?.pages[data.pages.length - 1].length === filmQuantityCatalog &&
				!searchParam && (
					<button
						onClick={() => fetchNextPage()}
						className={styles['catalog__fetchButton']}
					>
						{isFetchingNextPage ? 'ЗАГРУЗКА...' : 'ЗАГРУЗИТЬ ЕЩЕ'}
					</button>
				)}
		</>
	)
}
