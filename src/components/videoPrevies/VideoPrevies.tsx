import { MouseEvent, useState } from 'react'
import Image from 'next/image'
import { IVideo } from '../../shared/types/video.type'
import { VideoPlayer } from '../videoPlayer/VideoPlayer'
import { useActiveVideoContext } from '../../context/ActiveVideoContext'
import { usePosition } from './usePosition'
import { ResizeBox } from './ResizeBox'
import styles from './VideoPrevies.module.scss'

interface IVideoPrevies {
	video: IVideo
	onClick: () => void
}

export function VideoPrevies({ video, onClick }: IVideoPrevies) {
	const [isDragging, setIsDragging] = useState(false)
	const { position, generateRandomSize, handleMouseDown, handleTouchStart } =
		usePosition(setIsDragging)

	const { activeVideo, setActiveVideo } = useActiveVideoContext()
	const [size, setSize] = useState(generateRandomSize())
	const setDrag = (e: MouseEvent) => {
		onClick()
		handleMouseDown(e)
	}
	const changeSize = (newWidth: number, newHeight: number) => {
		setSize({ initWidth: newWidth, initHeight: newHeight })
	}

	const removeVideo = () => {
		setActiveVideo(activeVideo.filter((aVideo) => aVideo.id !== video.id))
	}

	return (
		<div
			className={styles['videoPrevies']}
			onClick={onClick}
			style={{
				left: position.x,
				top: position.y,
				cursor: isDragging ? 'grabbing' : 'grab',
				width: size.initWidth,
				height: size.initHeight,
				zIndex: video.zIndex,
			}}
			onMouseDown={setDrag}
			onTouchStart={handleTouchStart}
		>
			<button
				className={styles['videoPrevies__close']}
				onClick={removeVideo}
				draggable={false}
			>
				<Image
					src="/images/close.svg"
					width={25}
					height={25}
					loading="eager"
					alt="закрыть"
					draggable={false}
				/>
			</button>
			<ResizeBox
				width={size.initWidth}
				height={size.initHeight}
				changeSize={changeSize}
			/>
			<VideoPlayer isPrevies={true} />
		</div>
	)
}
