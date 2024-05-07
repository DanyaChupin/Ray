import { SlideItem } from '../slideItem/SlideItem'
import { IVideo } from '@/shared/types/video.type'
import cn from 'classnames'
import { Dispatch, SetStateAction } from 'react'
import { useActiveVideoContext } from '@/context/ActiveVideoContext'
import styles from './Slide.module.scss'

interface ISlide {
	sideLeft: boolean
	videoArray: IVideo[]
	setDragVideo: Dispatch<SetStateAction<IVideo>>
}

export function Slide({ sideLeft, videoArray, setDragVideo }: ISlide) {
	const { activeVideo, setActiveVideo } = useActiveVideoContext()
	return (
		<div className={styles['slide']}>
			<div
				className={cn(styles['slide-wrapper'], {
					[styles['slide-left']]: sideLeft,
					[styles['slide-right']]: !sideLeft,
				})}
			>
				{videoArray.map((video) => (
					<SlideItem
						video={video}
						setDragVideo={setDragVideo}
						activeVideo={activeVideo}
						setActiveVideo={setActiveVideo}
						key={video.id}
					/>
				))}
			</div>
			<div
				className={cn(styles['slide-wrapper'], {
					[styles['slide-left']]: sideLeft,
					[styles['slide-right']]: !sideLeft,
				})}
			>
				{videoArray.map((video) => (
					<SlideItem
						video={video}
						activeVideo={activeVideo}
						setActiveVideo={setActiveVideo}
						setDragVideo={setDragVideo}
						key={video.id}
					/>
				))}
			</div>
		</div>
	)
}
