import { SlideItem } from '../slideItem/SlideItem'
import cn from 'classNames'
import styles from './Slide.module.scss'

type ISlide = { sideLeft: boolean }

export function Slide({ sideLeft }: ISlide) {
	return (
		<div className={styles['slide']}>
			<div
				className={cn(styles['slide-wrapper'], {
					[styles['slide-left']]: sideLeft,
					[styles['slide-right']]: !sideLeft,
				})}
			>
				<SlideItem />
				<SlideItem />
				<SlideItem />
				<SlideItem />
				<SlideItem />
				<SlideItem />
				<SlideItem />
				<SlideItem />
				<SlideItem />
			</div>
			<div
				className={cn(styles['slide-wrapper'], {
					[styles['slide-left']]: sideLeft,
					[styles['slide-right']]: !sideLeft,
				})}
			>
				<SlideItem />
				<SlideItem />
				<SlideItem />
				<SlideItem />
				<SlideItem />
				<SlideItem />
				<SlideItem />
				<SlideItem />
				<SlideItem />
			</div>
		</div>
	)
}
