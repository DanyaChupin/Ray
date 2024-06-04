import { IVideoPrevies } from '@/shared/types/video.type'
import { Slide } from '../slide/Slide'
import { Dispatch, SetStateAction, useMemo } from 'react'
import { videoPreviesTransformation } from '@/utils/videoPreviesTransformation'
import { useFilmsByDirectories } from './useFilmsByDirectories'
import styles from './Slider.module.scss'

interface ISlider {
	setDragVideo: Dispatch<SetStateAction<IVideoPrevies>>
}

export function Slider({ setDragVideo }: ISlider) {
	const { data, isLoading, isError } = useFilmsByDirectories()

	const videoPrevies = videoPreviesTransformation(data || [])
	return useMemo(
		() => (
			<div className={styles['slider']}>
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[isLoading]
	)
}
