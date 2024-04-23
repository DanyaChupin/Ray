'use client'
import { ChangeEvent, useState } from 'react'
import { ButtonLang } from '../../components/buttonLang/ButtonLang'
import { InputField } from '../../components/InputFIled/InputField'
import { Logo } from '../../components/Logo/Logo'
import { Slider } from '../../components/slider/Slider'
import { FlexBox } from '../../components/ui/flexBox/FlexBox'
import { useResize } from '../../hooks/useResize'
import { Select } from '../../components/select/Select'
import { SearchForm } from '../../components/searchForm/SearchForm'
import { SelectItem } from '../../components/selectItem/SelectItem'
import { defaultSelect } from '../../utils/default-select'
import { Footer } from '../../components/footer/Footer'
import { BackLink } from '../../components/backLink/BackLink'
import { DESCRIPTION } from '../../utils/description'
import styles from './Home.module.scss'

export default function HomePage() {
	const { isScreenXl, isScreenLg } = useResize()
	const [inputValue, SetInputValue] = useState('')
	const [isSelectVisible, setSelectVisible] = useState(false)
	const [checkDescription, setCheckDescription] = useState(false)
	const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
		SetInputValue(e.target.value)
	}

	return (
		<>
			<Slider screenSize={isScreenXl} />
			<main className={styles['home']}>
				<section className={styles['home__section']}>
					<FlexBox column={true}>
						<Logo />
						{checkDescription ? (
							<p className={styles['home__description']}>{DESCRIPTION}</p>
						) : (
							<SearchForm>
								<InputField
									value={inputValue}
									onChange={changeInput}
									onFocus={() => setSelectVisible(true)}
									onBlur={() => setSelectVisible(false)}
									screenSize={isScreenLg}
									pathIcon='/images/search.svg'
								/>
								<Select isOpen={isSelectVisible}>
									{defaultSelect.map(option => (
										<SelectItem
											onClick={
												option.text === 'Что такое ЛУЧ?'
													? () => {
															setCheckDescription(!checkDescription)
														}
													: () => {}
											}
											pathIcon='/images/search.svg'
											option={option}
											screenSize={isScreenLg}
										/>
									))}
								</Select>
							</SearchForm>
						)}
					</FlexBox>
				</section>
				<Footer>
					{checkDescription && (
						<BackLink
							returnBackUrl=''
							checkDescription={() => setCheckDescription(!checkDescription)}
						/>
					)}
					<ButtonLang />
				</Footer>
			</main>
		</>
	)
}
