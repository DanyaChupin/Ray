import { IVideoPrevies } from '@/shared/types/video.type'
import { Slide } from '../slide/Slide'
import { Dispatch, SetStateAction, useMemo } from 'react'
import cn from 'classnames'
import { useFilmsByTag } from './useFilmsByTag'
import { videoPreviesTransformation } from '@/utils/videoPreviesTransformation'
import styles from './Slider.module.scss'

interface ISlider {
	setDragVideo: Dispatch<SetStateAction<IVideoPrevies>>
}

export function Slider({ setDragVideo }: ISlider) {
	const { data, isLoading, isError } = useFilmsByTag()

	const videoPrevies = videoPreviesTransformation(data)
	return useMemo(
		() => (
			<div className={cn(styles['slider'], {})}>
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
		),
		[isLoading]
	)
}
