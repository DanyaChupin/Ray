import { IVideoPrevies } from '@/shared/types/video.type'
import { Slide } from '../slide/Slide'
import { Dispatch, SetStateAction } from 'react'
import cn from 'classnames'
import styles from './Slider.module.scss'
import { useFilmsByTag } from './useFilmsByTag'
import { videoPreviesTransformation } from '@/utils/videoPreviesTransformation'

interface ISlider {
	setDragVideo: Dispatch<SetStateAction<IVideoPrevies>>
	hidden: boolean
}

export function Slider({ setDragVideo, hidden }: ISlider) {
	const { data, isLoading, isError } = useFilmsByTag()
	const videoPrevies = videoPreviesTransformation(data)

	return (
		<div
			className={cn(styles['slider'], {
				[styles['hidden']]: hidden,
			})}
		>
			<div className={styles['first']}>
				<Slide
					isLoading={isLoading || isError}
					sideLeft={true}
					setDragVideo={setDragVideo}
					videoPrevies={videoPrevies || []}
				/>
			</div>
			<div>
				<Slide
					isLoading={isLoading || isError}
					sideLeft={false}
					setDragVideo={setDragVideo}
					videoPrevies={videoPrevies || []}
				/>
			</div>
		</div>
	)
}
