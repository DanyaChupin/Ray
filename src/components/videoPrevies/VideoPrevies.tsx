import { useState } from 'react'
import { IVideo } from '@/shared/types/video.type'
import Draggable from 'react-draggable'
import Image from 'next/image'
import styles from './VideoPrevies.module.scss'

interface IVideoPrevies {
	video: IVideo
}

const coordinates = function randomPosition() {
	const x = Math.floor(Math.random() * 400)
	const y = Math.floor(Math.random() * 200)
	return { x, y }
}

function getRandomSize() {
	const width = Math.floor(Math.random() * 500) + 200
	const height = width / 1.5
	return { width, height }
}

export function VideoPrevies({ video }: IVideoPrevies) {
	const [zIndex, setZIndex] = useState(0)
	const [size] = useState<{ width: number; height: number }>(getRandomSize())

	return (
		<Draggable grid={[1, 1]} defaultPosition={coordinates()}>
			<Image
				onClick={() => setZIndex(prev => prev + 1)}
				src={video.src}
				style={{ zIndex: zIndex }}
				width={size.width}
				height={size.height}
				alt='video'
				className={styles['videoPrevies']}
				draggable={false}
			/>
		</Draggable>
	)
}
