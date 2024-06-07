import { Dispatch, SetStateAction, useContext } from 'react'
import { SlideItem } from '../slideItem/SlideItem'
import { IVideoPrevies } from '@/shared/types/video.type'
import cn from 'classnames'
import { SkeletonSlideItem } from '../slideItem/SkeletonSlideItem'
import styles from './Slide.module.scss'
import { filmQuantityPrevies } from '@/utils/constants'
import { ActiveVideoContext } from '@/context/ActiveVideoContext'

interface ISlide {
	sideLeft: boolean
	videoPrevies: IVideoPrevies[]
	setDragVideo: Dispatch<SetStateAction<IVideoPrevies>>
	isLoading: boolean
}

const elemLoading = Array(filmQuantityPrevies).fill('')

export function Slide({
	sideLeft,
	videoPrevies,
	setDragVideo,
	isLoading,
}: ISlide) {
	const { activeVideo, setActiveVideo } = useContext(ActiveVideoContext)
	return (
		<div className={styles['slide']}>
			<div
				className={cn(styles['slide-wrapper'], {
					[styles['slide-left']]: sideLeft,
					[styles['slide-right']]: !sideLeft,
				})}
			>
				{isLoading &&
					elemLoading.map((_elem, index) => <SkeletonSlideItem key={index} />)}
				{videoPrevies.map((video) => (
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
				{isLoading &&
					elemLoading.map((_elem, index) => <SkeletonSlideItem key={index} />)}
				{videoPrevies.map((video) => (
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
