import { IVideo } from '@/shared/types/video.type'
import { Slide } from '../slide/Slide'
import { Dispatch, SetStateAction } from 'react'
import cn from 'classnames'
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
		},
		{
			id: '2',
			title: 'Video',
			src: '/photo.png',
		},
		{
			id: '3',
			title: 'Video',
			src: '/photo.png',
		},
		{
			id: '4',
			title: 'Video',
			src: '/photo.png',
		},
		{
			id: '5',
			title: 'Video',
			src: '/photo.png',
		},
		{
			id: '6',
			title: 'Video',
			src: '/photo.png',
		},
		{
			id: '7',
			title: 'Video',
			src: '/photo.png',
		},
		{
			id: '8',
			title: 'Video',
			src: '/photo.png',
		},
		{
			id: '9',
			title: 'Video',
			src: '/photo.png',
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
