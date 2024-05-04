'use client'
import { Viewport } from 'next'
import { useState } from 'react'
import { DragDropSearch } from '../components/dragDropSearch/DragDropSearch'
import { Slider } from '../components/slider/Slider'
import { useResize } from '../hooks/useResize'
import { IVideo } from '../shared/types/video.type'
import { ActiveVideoContext } from '../context/ActiveVideoContext'
import styles from './Home.module.scss'
export const viewport: Viewport = {
	// width: 500,
	maximumScale: 0,
	userScalable: false,
	viewportFit: 'cover',
}
export default function HomePage() {
	const [dragVideo, setDragVideo] = useState<IVideo>({
		id: '',
		src: '',
		title: '',
	})

	const { isScreenXl } = useResize()
	const maxActiveVideo = isScreenXl ? 4 : 2

	const [activeVideo, setActiveVideo] = useState<IVideo[]>([])

	return (
		<div className={styles['wrapper']}>
			<ActiveVideoContext.Provider value={{ activeVideo, setActiveVideo }}>
				<Slider
					setDragVideo={setDragVideo}
					hidden={activeVideo.length === maxActiveVideo ? true : false}
				/>
				<div className={styles['home']}>
					<DragDropSearch
						dragVideo={dragVideo}
						activeVideo={activeVideo}
						setActiveVideo={setActiveVideo}
					/>
				</div>
			</ActiveVideoContext.Provider>
		</div>
	)
}
