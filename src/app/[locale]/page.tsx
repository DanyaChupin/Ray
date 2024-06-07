'use client'
import { useContext, useState } from 'react'
import { DragDropSearch } from '../../components/dragDropSearch/DragDropSearch'
import { Slider } from '../../components/slider/Slider'
import { IVideoPrevies } from '../../shared/types/video.type'
import cn from 'classnames'
import { useScreenSize } from '@/hooks/useScreenSize'
import styles from './Home.module.scss'
import { ActiveVideoContext } from '@/context/ActiveVideoContext'

export default function HomePage() {
	const [dragVideo, setDragVideo] = useState<IVideoPrevies>({
		id: '',
		src: '',
		poster: '',
		zIndex: 10,
	})
	const { activeVideo, setActiveVideo } = useContext(ActiveVideoContext)
	const { isScreenXl } = useScreenSize()
	const maxActiveVideo = isScreenXl ? 4 : 2

	return (
		<div className={styles['wrapper']}>
			<div
				className={cn(styles['slider__wrapper'], {
					[styles['hidden']]: maxActiveVideo === activeVideo.length,
				})}
			>
				<Slider setDragVideo={setDragVideo} />
			</div>
			<div className={styles['home']}>
				<DragDropSearch
					dragVideo={dragVideo}
					activeVideo={activeVideo}
					setActiveVideo={setActiveVideo}
				/>
			</div>
		</div>
	)
}
