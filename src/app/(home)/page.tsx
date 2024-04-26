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
import { IVideo } from '@/shared/types/video.type'
import { VideoPrevies } from '@/components/videoPrevies/VideoPrevies'
import { ActiveVideoContext } from '@/context/ActiveVideoContext'
import styles from './Home.module.scss'

export default function HomePage() {
	const { isScreenXl, isScreenLg } = useResize()
	const [inputValue, SetInputValue] = useState('')
	const [isSelectVisible, setSelectVisible] = useState(false)
	const [checkDescription, setCheckDescription] = useState(false)
	const [activeVideo, setActiveVideo] = useState<IVideo[]>([])

	const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
		SetInputValue(e.target.value)
	}

	return (
		<>
			<ActiveVideoContext.Provider value={{ activeVideo, setActiveVideo }}>
				{activeVideo.length === 4 ? '' : <Slider screenSize={isScreenXl} />}
				<main className={styles['home']}>
					<section className={styles['home__section']}>
						{activeVideo.length ? (
							activeVideo.map(video => (
								<VideoPrevies video={video} key={video.id} />
							))
						) : (
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
													key={option.text}
												/>
											))}
										</Select>
									</SearchForm>
								)}
							</FlexBox>
						)}
					</section>
					<Footer>
						{activeVideo.length ? (
							<BackLink returnBackUrl='' onClick={() => setActiveVideo([])} />
						) : (
							<>
								{checkDescription && (
									<BackLink
										returnBackUrl=''
										onClick={() => setCheckDescription(!checkDescription)}
									/>
								)}
								<ButtonLang />
							</>
						)}
					</Footer>
				</main>
			</ActiveVideoContext.Provider>
		</>
	)
}
