'use client'
import { ChangeEvent, useState } from 'react'
import { FlexBox } from '../ui/flexBox/FlexBox'
import { Logo } from '../Logo/Logo'
import { SearchForm } from '../searchForm/SearchForm'
import styles from './Header.module.scss'
import Link from 'next/link'

export function Header() {
	const [inputValue, setInputValue] = useState('')
	const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value)
	}
	return (
		<header className={styles['header']}>
			<FlexBox column={false} center={false}>
				<Link href="/">
					<Logo catalogLogo />
				</Link>
				<SearchForm
					selectOptions={[
						{
							text: 'Nike SB | Yuto Horigome in Tokyo',
							to: '/catalog',
						},
					]}
					catalogStyle
					inputValue={inputValue}
					changeInput={changeInput}
				/>
			</FlexBox>
		</header>
	)
}
