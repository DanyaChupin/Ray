'use client'
import { useState } from 'react'
import { DragDropSearch } from '../components/dragDropSearch/DragDropSearch'
import { Slider } from '../components/slider/Slider'
import { useResize } from '../hooks/useResize'
import { IVideo } from '../shared/types/video.type'
import { ActiveVideoContext } from '../context/ActiveVideoContext'
import styles from './Home.module.scss'
import Head from 'next/head'

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
		<>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, viewport-fit=cover"
				/>
			</Head>
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
		</>
	)
}
