'use client'
import { useContext, useState } from 'react'
import { DragDropSearch } from '../../components/dragDropSearch/DragDropSearch'
import { Slider } from '../../components/slider/Slider'
import { IVideoPrevies } from '../../shared/types/video.type'
import cn from 'classnames'
import { useScreenSize } from '@/hooks/useScreenSize'
import { ActiveVideoContext } from '@/context/ActiveVideoContext'
import styles from './Home.module.scss'
import Head from 'next/head'

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
		<>
			<Head>
				<title>Luch world</title>
				<meta
					name="description"
					content="ЛУЧ — это попытка консолидации и создания независимых фильмов,свободных от строгих рамок."
				/>
				<meta name="document-state" content="Static" />
				<meta
					property="og:title"
					content="— это попытка консолидации и создания независимых фильмов,свободных от строгих рамок."
				/>
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://luch.world/" />
				<meta
					property="og:description"
					content="— это попытка консолидации и создания независимых фильмов,свободных от строгих рамок."
				/>
				<meta
					property="og:site_name"
					content="luch.world фильмы от независимых авторов"
				/>
				<link rel="canonical" href="https://luch.world/" />
				<meta
					name="zen-verification"
					content="p92vrTS31hx9WbZfBBIZmSyRNNbXwDp2ErXqRRs7G9FiD7ec3YKaTtjpSPTiafX1"
				/>
				<meta
					name="keywords"
					content="независимое кино,смотреть,смотреть кино, производство фильмов, кинопроизводство, кинематография, киносъемка, луч мир, независимая киноиндустрия, искусство, искусство кино, киноискусство, смотреть онлайн"
				/>
			</Head>
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
		</>
	)
}
