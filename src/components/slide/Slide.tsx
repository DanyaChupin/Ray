import { SlideItem } from '../slideItem/SlideItem'
import { IVideo } from '@/shared/types/video.type'
import cn from 'classnames'
import styles from './Slide.module.scss'

interface ISlide {
	sideLeft: boolean
	videoArray: IVideo[]
}

export function Slide({ sideLeft, videoArray }: ISlide) {
	return (
		<div className={styles['slide']}>
			<div
				className={cn(styles['slide-wrapper'], {
					[styles['slide-left']]: sideLeft,
					[styles['slide-right']]: !sideLeft,
				})}
			>
				{videoArray.map(video => (
					<SlideItem video={video} key={video.id} />
				))}
			</div>
			<div
				className={cn(styles['slide-wrapper'], {
					[styles['slide-left']]: sideLeft,
					[styles['slide-right']]: !sideLeft,
				})}
			>
				{videoArray.map(video => (
					<SlideItem video={video} key={video.id} />
				))}
			</div>
		</div>
	)
}
