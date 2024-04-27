import { IVideo } from '@/shared/types/video.type'
import { Slide } from '../slide/Slide'
import styles from './Slider.module.scss'
import { Dispatch, SetStateAction } from 'react'

interface ISlider {
	screenSize: boolean
	setDragVideo: Dispatch<SetStateAction<IVideo>>
}

export function Slider({ screenSize, setDragVideo }: ISlider) {
	const mock: IVideo[] = [
		{
			id: '1',
			title: 'Video',
			src: '/photo.jpeg',
		},
		{
			id: '2',
			title: 'Video',
			src: '/photo.jpeg',
		},
		{
			id: '3',
			title: 'Video',
			src: '/photo.jpeg',
		},
		{
			id: '4',
			title: 'Video',
			src: '/photo.jpeg',
		},
		{
			id: '5',
			title: 'Video',
			src: '/photo.jpeg',
		},
		{
			id: '6',
			title: 'Video',
			src: '/photo.jpeg',
		},
		{
			id: '7',
			title: 'Video',
			src: '/photo.jpeg',
		},
		{
			id: '8',
			title: 'Video',
			src: '/photo.jpeg',
		},
		{
			id: '9',
			title: 'Video',
			src: '/photo.jpeg',
		},
	]
	return (
		<div className={styles['slider']}>
			<Slide sideLeft={true} setDragVideo={setDragVideo} videoArray={mock} />
			{screenSize && (
				<Slide sideLeft={false} setDragVideo={setDragVideo} videoArray={mock} />
			)}
		</div>
	)
}
