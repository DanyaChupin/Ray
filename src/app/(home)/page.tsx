'use client'
import { useState } from 'react'
import { DragDropSearch } from '@/components/dragDropSearch/DragDropSearch'
import { Slider } from '../../components/slider/Slider'
import { useResize } from '../../hooks/useResize'
import { IVideo } from '@/shared/types/video.type'
import { ActiveVideoContext } from '@/context/ActiveVideoContext'
import styles from './Home.module.scss'

export default function HomePage() {
	const { isScreenXl, isScreenLg } = useResize()
	const [dragVideo, setDragVideo] = useState<IVideo>({
		id: '',
		src: '',
		title: '',
	})
	const [activeVideo, setActiveVideo] = useState<IVideo[]>([])

	return (
		<>
			<ActiveVideoContext.Provider value={{ activeVideo, setActiveVideo }}>
				{activeVideo.length === 4 ? (
					''
				) : (
					<Slider setDragVideo={setDragVideo} screenSize={isScreenXl} />
				)}
				<div className={styles['home']}>
					<DragDropSearch
						screenSize={isScreenLg}
						dragVideo={dragVideo}
						activeVideo={activeVideo}
						setActiveVideo={setActiveVideo}
					/>
				</div>
			</ActiveVideoContext.Provider>
		</>
	)
}
