'use client'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Image from 'next/image'
import { useResize } from '../../hooks/useResize'
import { IVideo } from '../../shared/types/video.type'
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
	const [isActive, setIsActive] = useState(false)

	const { isScreenLg } = useResize()
	const MAXVIDEO = isScreenLg ? 4 : 2

	useEffect(() => {
		const isActiveVideo = activeVideo.find((aVideo) => aVideo.id === video.id)
		setIsActive(!!isActiveVideo)
	}, [activeVideo, video.id])

	const openVideoPreviesDrag = () => {
		if (isActive) return
		setDragVideo(video)
	}

	const openVideoPrevieClick = () => {
		if (isActive) {
			const updatedItems = activeVideo.filter((item) => item.id !== video.id)
			setActiveVideo(updatedItems)
			setIsActive(false)
			return
		}
		if (activeVideo.length === MAXVIDEO) {
			return
		}
		setActiveVideo((prev) => [...prev, video])
		setIsActive(true)
	}

	return (
		<>
			{isActive ? (
				<Image
					onClick={openVideoPrevieClick}
					className={styles['slideItem']}
					width={70}
					height={54.71}
					src="/images/net.png"
					loading="eager"
					alt="photo"
					draggable={false}
					priority
				/>
			) : (
				<Image
					onClick={openVideoPrevieClick}
					onTouchCancel={openVideoPreviesDrag}
					onDragStart={openVideoPreviesDrag}
					className={cn(styles['slideItem'], styles['draggable'])}
					width={70}
					height={54.71}
					src={video.src}
					loading="eager"
					priority
					draggable={true}
					alt="photo"
				/>
			)}
		</>
	)
}
