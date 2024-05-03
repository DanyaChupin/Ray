import { useState } from 'react'
import { IVideo } from '../../shared/types/video.type'
import { VideoPlayer } from '../videoPlayer/VideoPlayer'
import { useActiveVideoContext } from '../../context/ActiveVideoContext'
import { usePosition } from './usePosition'
import styles from './VideoPrevies.module.scss'

interface IVideoPrevies {
	video: IVideo
}

export function VideoPrevies({ video }: IVideoPrevies) {
	const {
		generateRandomSize,
		position,
		isDragging,
		handleMouseDown,
		handleTouchStart,
	} = usePosition()

	const { activeVideo, setActiveVideo } = useActiveVideoContext()

	const [size] = useState<{ width: number; height: number }>(
		generateRandomSize()
	)
	const removeVideo = () => {
		setActiveVideo(activeVideo.filter((aVideo) => aVideo.id !== video.id))
	}

	return (
		<div
			className={styles['videoPrevies']}
			style={{
				left: position.x,
				top: position.y,
				cursor: isDragging ? 'grabbing' : 'grab',
				width: size.width,
				height: size.height,
			}}
			onMouseDown={handleMouseDown}
			onTouchStart={handleTouchStart}
		>
			<VideoPlayer isPrevies={true} removeVideo={removeVideo} />
		</div>
	)
}
