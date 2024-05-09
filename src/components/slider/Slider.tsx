import { IVideo } from '@/shared/types/video.type'
import { Slide } from '../slide/Slide'
import { Dispatch, SetStateAction } from 'react'
import cn from 'classNames'
import styles from './Slider.module.scss'

interface ISlider {
	setDragVideo: Dispatch<SetStateAction<IVideo>>
	hidden: boolean
}

export function Slider({ setDragVideo, hidden }: ISlider) {
	const mock: IVideo[] = [
		{
			id: '1',
			title: 'Video',
			src: '/photo.png',
			zIndex: 10,
		},
		{
			id: '2',
			title: 'Video',
			src: '/photo.png',
			zIndex: 10,
		},
		{
			id: '3',
			title: 'Video',
			src: '/photo.png',
			zIndex: 10,
		},
		{
			id: '4',
			title: 'Video',
			src: '/photo.png',
			zIndex: 10,
		},
		{
			id: '5',
			title: 'Video',
			src: '/photo.png',
			zIndex: 10,
		},
		{
			id: '6',
			title: 'Video',
			src: '/photo.png',
			zIndex: 10,
		},
		{
			id: '7',
			title: 'Video',
			src: '/photo.png',
			zIndex: 10,
		},
		{
			id: '8',
			title: 'Video',
			src: '/photo.png',
			zIndex: 10,
		},
		{
			id: '9',
			title: 'Video',
			src: '/photo.png',
			zIndex: 10,
		},
	]
	return (
		<div
			className={cn(styles['slider'], {
				[styles['hidden']]: hidden,
			})}
		>
			<div className={styles['first']}>
				<Slide sideLeft={true} setDragVideo={setDragVideo} videoArray={mock} />
			</div>
			<div>
				<Slide sideLeft={false} setDragVideo={setDragVideo} videoArray={mock} />
			</div>
		</div>
	)
}
