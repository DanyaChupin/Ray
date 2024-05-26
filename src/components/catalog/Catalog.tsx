'use client'
import { CatalogItem } from '../catalogItem/CatalogItem'
import { SkeletonCatalogItem } from '../catalogItem/SkeletonCatalogItem'
import { useFilms } from './useFilms'
import styles from './Catalog.module.scss'
import { useSearchParams } from 'next/navigation'
import { useFilmSearch } from '../header/useFilmSearch'
import { ErrorMessage } from '../errorMessage/ErrorMessage'
import { useEffect } from 'react'

const elemLoading = Array(12).fill('')

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
	}, [searchParam])

	if (searchIsError) {
		return (
			<ErrorMessage error={searchError?.message || ''} redirect="catalog" />
		)
	}

	if (isError) {
		return <ErrorMessage error={error?.message || ''} redirect="catalog" />
	}

	return (
		<>
			<div className={styles['catalog']}>
				{searchData &&
					searchData.data.map((film) => (
						<CatalogItem film={film} key={film.videoId} />
					))}
				{data?.pages &&
					!searchParam &&
					data.pages.map((page) =>
						page.map((film) => <CatalogItem film={film} key={film.videoId} />)
					)}

				{(isLoading || isFetchingNextPage || searchIsLoading) && (
					<>
						{elemLoading.map((_elem, index) => (
							<SkeletonCatalogItem key={index} />
						))}
					</>
				)}
			</div>

			{data?.pages[data.pages.length - 1].length === 12 && !searchParam && (
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
