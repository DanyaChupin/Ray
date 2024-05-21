import { MouseEvent, TouchEvent, useState } from 'react'
import { IVideo } from '../../shared/types/video.type'
import { VideoPlayer } from '../videoPlayer/VideoPlayer'
import { useActiveVideoContext } from '../../context/ActiveVideoContext'
import { usePosition } from './usePosition'
import { useResize } from './useResize'
import styles from './VideoPrevies.module.scss'

interface IVideoPrevies {
	video: IVideo
	changeZIndex: () => void
}

export function VideoPrevies({ video, changeZIndex }: IVideoPrevies) {
	const [isDragging, setIsDragging] = useState(false)

	const { position, generateRandomSize, handleMouseDown, handleTouchStart } =
		usePosition(setIsDragging)

	const { activeVideo, setActiveVideo } = useActiveVideoContext()

	const [size, setSize] = useState(generateRandomSize())

	const setDragPC = (e: MouseEvent) => {
		changeZIndex()
		handleMouseDown(e)
	}

	const setDragMobile = (e: TouchEvent) => {
		changeZIndex()
		handleTouchStart(e)
	}

	const changeSize = (newWidth: number, newHeight: number) => {
		setSize({ initWidth: newWidth, initHeight: newHeight })
	}

	const removeVideo = () => {
		setActiveVideo(activeVideo.filter((aVideo) => aVideo.id !== video.id))
	}

	const { onMouseDown, onTouchStart } = useResize({
		width: size.initWidth,
		height: size.initHeight,
		changeSize,
		changeZIndex,
	})
	return (
		<div
			className={styles['videoPrevies']}
			onClick={changeZIndex}
			style={{
				left: position.x,
				top: position.y,
				cursor: isDragging ? 'grabbing' : 'grab',
				width: size.initWidth,
				height: size.initHeight,
				zIndex: video.zIndex,
			}}
			onMouseDown={setDragPC}
			onTouchStart={setDragMobile}
		>
			<VideoPlayer
				isPrevies={true}
				autoPlay={true}
				removeVideo={removeVideo}
				onTouchStart={onTouchStart}
				onMouseDown={onMouseDown}
			/>
		</div>
	)
}
