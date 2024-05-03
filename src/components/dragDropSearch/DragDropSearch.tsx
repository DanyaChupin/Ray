import {
	ChangeEvent,
	Dispatch,
	DragEvent,
	SetStateAction,
	useState,
} from 'react'
import { Logo } from '../Logo/Logo'
import { FlexBox } from '../ui/flexBox/FlexBox'
import { VideoPrevies } from '../videoPrevies/VideoPrevies'
import { SearchForm } from '../searchForm/SearchForm'
import { InputField } from '../InputFIled/InputField'
import { Select } from '../select/Select'
import { SelectItem } from '../selectItem/SelectItem'
import { IVideo } from '@/shared/types/video.type'
import { defaultSelect } from '@/utils/default-select'
import { Footer } from '../footer/Footer'
import { BackLink } from '../backLink/BackLink'
import { ButtonLang } from '../buttonLang/ButtonLang'
import { DESCRIPTION } from '@/utils/description'
import cn from 'classnames'
import styles from './DragDropSearch.module.scss'

interface IDragDropSearch {
	dragVideo: IVideo
	activeVideo: IVideo[]
	setActiveVideo: Dispatch<SetStateAction<IVideo[]>>
}
export function DragDropSearch({
	dragVideo,
	activeVideo,
	setActiveVideo,
}: IDragDropSearch) {
	const [inputValue, setInputValue] = useState('')
	const [isSelectVisible, setSelectVisible] = useState(false)
	const [checkDescription, setCheckDescription] = useState(false)
	const [dragActive, setDragActive] = useState(false)

	const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value)
	}

	const handleDrag = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		setDragActive(true)
	}

	const handleLeave = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		setDragActive(false)
	}

	const handleDrop = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		if (dragVideo.id) setActiveVideo(prev => [...prev, dragVideo])
		setDragActive(false)
	}
	return (
		<>
			<main
				onDragEnter={handleDrag}
				onDragOver={handleDrag}
				onDrop={handleDrop}
				onDragLeave={handleLeave}
				className={cn(styles['wrapper'], {
					[styles['activeDrag']]: dragActive,
				})}
			>
				{activeVideo.length ? (
					activeVideo.map(video => (
						<VideoPrevies video={video} key={video.id} />
					))
				) : (
					<FlexBox column={true}>
						<Logo />
						{checkDescription ? (
							<p className={styles['description']}>{DESCRIPTION}</p>
						) : (
							<SearchForm>
								<InputField
									value={inputValue}
									onChange={changeInput}
									onFocus={() => setSelectVisible(true)}
									onBlur={() => setSelectVisible(false)}
									pathIcon='./images/search.svg'
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
											pathIcon='./images/search.svg'
											option={option}
											key={option.text}
										/>
									))}
								</Select>
							</SearchForm>
						)}
					</FlexBox>
				)}
			</main>
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
		</>
	)
}
