'use client'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Image from 'next/image'
import { useScreenSize } from '../../hooks/useScreenSize'
import { IVideoPrevies } from '../../shared/types/video.type'
import cn from 'classnames'
import styles from './SlideItem.module.scss'

interface ISlideItem {
	video: IVideoPrevies
	setDragVideo: Dispatch<SetStateAction<IVideoPrevies>>
	activeVideo: IVideoPrevies[]
	setActiveVideo: Dispatch<SetStateAction<IVideoPrevies[]>>
}

export function SlideItem({
	video,
	setDragVideo,
	activeVideo,
	setActiveVideo,
}: ISlideItem) {
	const [isActive, setIsActive] = useState(false)
	const [isDragging, setIsDragging] = useState(false)
	const { isScreenLg } = useScreenSize()
	const MAXVIDEO = isScreenLg ? 4 : 2

	useEffect(() => {
		const isActiveVideo = activeVideo.find((aVideo) => aVideo.id === video.id)
		setIsActive(!!isActiveVideo)
	}, [activeVideo, video.id])

	const openVideoPreviesDrag = () => {
		if (isActive) return
		setIsDragging(true)
		setDragVideo({ ...video, zIndex: 10 })
	}

	const clearDragVideo = () => {
		setDragVideo({ id: '', src: '', poster: '', zIndex: 1 })
	}

	const openVideoPreviesClick = () => {
		if (isActive) {
			const updatedItems = activeVideo.filter((item) => item.id !== video.id)
			setActiveVideo(updatedItems)
			setIsActive(false)
			return
		}
		if (activeVideo.length === MAXVIDEO) {
			return
		}
		setActiveVideo((prev) => [...prev, { ...video, zIndex: 1 }])
		setIsActive(true)
	}

	return (
		<>
			{isActive ? (
				<Image
					onClick={openVideoPreviesClick}
					className={styles['slideItem']}
					width={70}
					height={55}
					src="/images/net.png"
					alt="взято"
					draggable={false}
					priority
				/>
			) : (
				<Image
					onClick={openVideoPreviesClick}
					onTouchStart={openVideoPreviesDrag}
					onDragStart={openVideoPreviesDrag}
					onTouchEnd={clearDragVideo}
					onDragEnd={clearDragVideo}
					className={cn(styles['slideItem'], {
						[styles['grabbing']]: isDragging,
					})}
					width={70}
					height={55}
					src={video.poster}
					draggable={true}
					alt="фильм"
					priority
				/>
			)}
		</>
	)
}
