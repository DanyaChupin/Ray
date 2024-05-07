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
import { IVideo } from '../../shared/types/video.type'
import { Footer } from '../footer/Footer'
import { BackLink } from '../backLink/BackLink'
import { ButtonLang } from '../buttonLang/ButtonLang'
import { DESCRIPTION } from '../../utils/description'
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
		if (dragVideo.id) setActiveVideo((prev) => [...prev, dragVideo])
		setDragActive(false)
	}

	const updateZIndex = (video: IVideo) => {
		setActiveVideo((prev) => {
			const updateZIndexVideo = prev.map((aVideo) => {
				if (aVideo.id === video.id) {
					aVideo.zIndex = prev.length // Перемещаем кликнутый элемент наверх
				} else if (video.zIndex <= aVideo.zIndex) {
					if (aVideo.zIndex !== 1) {
						aVideo.zIndex-- // Уменьшаем zIndex для остальных элементов
					}
				}
				return aVideo
			})
			return updateZIndexVideo
		})
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
					activeVideo.map((video) => (
						<VideoPrevies
							video={video}
							key={video.id}
							changeZIndex={() => updateZIndex(video)}
						/>
					))
				) : (
					<FlexBox column={true}>
						<Logo />
						{checkDescription ? (
							<p className={styles['description']}>{DESCRIPTION}</p>
						) : (
							<SearchForm
								inputValue={inputValue}
								changeInput={changeInput}
								setCheckDescription={setCheckDescription}
							/>
						)}
					</FlexBox>
				)}
			</main>
			<Footer>
				{activeVideo.length ? (
					<BackLink returnBackUrl="" onClick={() => setActiveVideo([])} />
				) : (
					<>
						{checkDescription && (
							<BackLink
								returnBackUrl=""
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
