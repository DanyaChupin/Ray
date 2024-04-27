'use client'
import Image from 'next/image'
import { useResize } from '@/hooks/useResize'
import { IVideo } from '@/shared/types/video.type'
import {
	Dispatch,
	SetStateAction,
	TouchEvent,
	memo,
	useEffect,
	useState,
} from 'react'
import cn from 'classnames'
import styles from './SlideItem.module.scss'

interface ISlideItem {
	video: IVideo
	setDragVideo: Dispatch<SetStateAction<IVideo>>
	activeVideo: IVideo[]
	setActiveVideo: Dispatch<SetStateAction<IVideo[]>>
}

export function SlideItem({
	video,
	setDragVideo,
	activeVideo,
	setActiveVideo,
}: ISlideItem) {
	const { isScreenLg } = useResize()
	const [isActive, setIsActive] = useState(false)

	const MAXVIDEO = isScreenLg ? 4 : 2

	useEffect(() => {
		const isActiveVideo = activeVideo.find(aVideo => aVideo.id === video.id)
		setIsActive(!!isActiveVideo)
	}, [activeVideo])

	const openVideoPreviesDrag = () => {
		if (isActive) return
		setDragVideo(video)
	}

	const openVideoPrevieClick = () => {
		if (isActive) {
			const updatedItems = activeVideo.filter(item => item.id !== video.id)
			setActiveVideo(updatedItems)
			setIsActive(false)
			return
		}
		if (activeVideo.length === MAXVIDEO) {
			return
		}
		setActiveVideo(prev => [...prev, video])
		setIsActive(true)
	}

	const { isScreenMd } = useResize()
	return (
		<>
			{isActive ? (
				<Image
					onClick={openVideoPrevieClick}
					className={styles['slideItem']}
					width={isScreenMd ? 160 : 70}
					height={isScreenMd ? 100 : 54.71}
					src='/images/net.png'
					alt='photo'
					draggable={false}
				/>
			) : (
				<Image
					onClick={openVideoPrevieClick}
					onTouchCancel={openVideoPreviesDrag}
					onDragStart={openVideoPreviesDrag}
					className={cn(styles['slideItem'], styles['draggable'])}
					width={isScreenMd ? 160 : 70}
					height={isScreenMd ? 100 : 54.71}
					src={video.src}
					draggable={true}
					alt='photo'
				/>
			)}
		</>
	)
}
