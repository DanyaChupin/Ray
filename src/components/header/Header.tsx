'use client'
import Link from 'next/link'
import { FlexBox } from '../ui/flexBox/FlexBox'
import { Logo } from '../Logo/Logo'
import { SearchForm } from '../searchForm/SearchForm'
import { useFilmSearch } from './useFilmSearch'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDebounce } from '@/hooks/useDebounce'
import styles from './Header.module.scss'
import { selectTransformation } from '@/utils/selectTransformation'

export function Header() {
	const [searchTerm, setSearchTerm] = useState('')
	const router = useRouter()
	const searchParams = useSearchParams()

	const searchParam = searchParams.get('search')
	const debouncedSearch = useDebounce(searchTerm, 300)

	const { searchData, searchIsLoading } = useFilmSearch(
		debouncedSearch,
		'searchSelect'
	)

	const options = selectTransformation(searchData)
	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	useEffect(() => {
		if (searchParam) {
			setSearchTerm(searchParam)
		} else {
			setSearchTerm('')
		}
	}, [searchParam])

	const onSubmit = (e: FormEvent) => {
		e.preventDefault()
		if (searchTerm) {
			router.push(`/catalog?search=${searchTerm}`)
		} else {
			router.push(`/catalog`)
		}
	}

	return (
		<header className={styles['header']}>
			<FlexBox column={false} center={false}>
				<Link href="/">
					<Logo catalogLogo />
				</Link>
				<SearchForm
					onSubmit={onSubmit}
					selectOptions={(searchTerm && options) || []}
					catalogStyle
					inputValue={searchTerm}
					changeInput={handleSearch}
					isLoading={searchIsLoading}
				/>
			</FlexBox>
		</header>
	)
}
