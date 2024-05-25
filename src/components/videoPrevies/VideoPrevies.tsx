import { MouseEvent, TouchEvent, useState } from 'react'
import { IVideoPrevies } from '../../shared/types/video.type'
import { VideoPlayer } from '../videoPlayer/VideoPlayer'
import { useActiveVideoContext } from '../../context/ActiveVideoContext'
import { usePosition } from './usePosition'
import { useResize } from './useResize'
import cn from 'classnames'
import styles from './VideoPrevies.module.scss'
import { SkeletonVideoPrevies } from './SkeletonVIdeoPrevies'

interface IVideoPreviesProps {
	video: IVideoPrevies
	changeZIndex: () => void
}

export function VideoPrevies({ video, changeZIndex }: IVideoPreviesProps) {
	const [isDragging, setIsDragging] = useState(false)
	const [localIsLoading, setLocalIsLoading] = useState(true)
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
			<div
				className={cn(styles['videoPrevies__wrapper'], {
					[styles['videoPrevies__hidden']]: localIsLoading,
				})}
			>
				<VideoPlayer
					onLoadLocal={setLocalIsLoading}
					poster={video.poster}
					src={video.src}
					isPrevies={true}
					autoPlay={true}
					removeVideo={removeVideo}
					onTouchStart={onTouchStart}
					onMouseDown={onMouseDown}
				/>
			</div>
			{localIsLoading && <SkeletonVideoPrevies />}
		</div>
	)
}
