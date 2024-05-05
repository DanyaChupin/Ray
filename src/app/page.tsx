'use client'
import { useState } from 'react'
import { DragDropSearch } from '../components/dragDropSearch/DragDropSearch'
import { Slider } from '../components/slider/Slider'
import { useScreenSize } from '../hooks/useScreenSize'
import { IVideo } from '../shared/types/video.type'
import { ActiveVideoContext } from '../context/ActiveVideoContext'
import styles from './Home.module.scss'

export default function HomePage() {
	const [dragVideo, setDragVideo] = useState<IVideo>({
		id: '',
		src: '',
		title: '',
		zIndex: 1,
	})

	const { isScreenXl } = useScreenSize()
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
