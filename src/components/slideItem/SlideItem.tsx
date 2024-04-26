'use client'
import Image from 'next/image'
import { useResize } from '@/hooks/useResize'
import { IVideo } from '@/shared/types/video.type'
import { useEffect, useState } from 'react'
import { useActiveVideoContext } from '@/context/ActiveVideoContext'
import styles from './SlideItem.module.scss'

interface ISlideItem {
	video: IVideo
}
export function SlideItem({ video }: ISlideItem) {
	const { activeVideo, setActiveVideo } = useActiveVideoContext()

	const { isScreenLg } = useResize()
	const [isActive, setIsActive] = useState(false)

	const MAXVIDEO = isScreenLg ? 4 : 2
	useEffect(() => {
		const isActiveVideo = activeVideo.find(aVideo => aVideo.id === video.id)
		setIsActive(!!isActiveVideo)
	}, [activeVideo])

	console.log(activeVideo.length)
	console.log(activeVideo)

	const openVideoPrevie = () => {
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
					onClick={openVideoPrevie}
					className={styles['slideItem']}
					width={isScreenMd ? 160 : 70}
					height={isScreenMd ? 100 : 54.71}
					src='/images/net.png'
					alt='photo'
					draggable={false}
				/>
			) : (
				<Image
					onClick={openVideoPrevie}
					className={styles['slideItem']}
					width={isScreenMd ? 160 : 70}
					height={isScreenMd ? 100 : 54.71}
					src={video.src}
					alt='photo'
				/>
			)}
		</>
	)
}
