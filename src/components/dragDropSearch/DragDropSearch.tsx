import {
	ChangeEvent,
	Dispatch,
	DragEvent,
	FormEvent,
	SetStateAction,
	useState,
} from 'react'
import { Logo } from '../Logo/Logo'
import { FlexBox } from '../ui/flexBox/FlexBox'
import { useRouter } from 'next/navigation'
import { VideoPrevies } from '../videoPrevies/VideoPrevies'
import { SearchForm } from '../searchForm/SearchForm'
import { IVideoPrevies } from '../../shared/types/video.type'
import { Footer } from '../footer/Footer'
import { BackLink } from '../backLink/BackLink'
import cn from 'classnames'
import { useDebounce } from '@/hooks/useDebounce'
import { useFilmSearch } from '../header/useFilmSearch'
import { selectTransformation } from '@/utils/selectTransformation'
import styles from './DragDropSearch.module.scss'
import { useTranslations } from 'next-intl'
import { ButtonLang } from '../buttonLang/ButtonLang'

interface IDragDropSearch {
	dragVideo: IVideoPrevies
	activeVideo: IVideoPrevies[]
	setActiveVideo: Dispatch<SetStateAction<IVideoPrevies[]>>
}
export function DragDropSearch({
	dragVideo,
	activeVideo,
	setActiveVideo,
}: IDragDropSearch) {
	const [inputValue, setInputValue] = useState('')
	const [checkDescription, setCheckDescription] = useState(false)
	const [dragActive, setDragActive] = useState(false)
	const router = useRouter()
	const debouncedSearch = useDebounce(inputValue, 300)
	const t = useTranslations('home')
	const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value)
	}
	const defaultSelect = [
		{
			text: t('howLuch'),
			to: '',
		},
		{
			text: t('catalog'),
			to: '/catalog',
		},
	]

	const { searchData, searchIsLoading } = useFilmSearch(
		debouncedSearch,
		'searchSelect'
	)

	const options = selectTransformation(searchData)?.slice(0, 3)
	const onSubmit = (e: FormEvent) => {
		e.preventDefault()
		if (debouncedSearch) {
			router.push(`/catalog?search=${inputValue}`)
		} else {
			router.push(`/catalog`)
		}
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

	const updateZIndex = (video: IVideoPrevies) => {
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
					<FlexBox column center>
						<Logo />
						{checkDescription ? (
							<p className={styles['description']}>{t('familiarization')}</p>
						) : (
							<SearchForm
								onSubmit={onSubmit}
								isLoading={searchIsLoading}
								selectOptions={inputValue ? options || [] : defaultSelect}
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
					<BackLink onClick={() => setActiveVideo([])} />
				) : (
					<>
						{checkDescription && (
							<BackLink onClick={() => setCheckDescription(false)} />
						)}
						<ButtonLang />
					</>
				)}
			</Footer>
		</>
	)
}
