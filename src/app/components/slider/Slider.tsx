'use client'
import { useResize } from '@/app/hooks/useResize'
import { Slide } from '../slide/Slide'
import styles from './Slider.module.scss'

export function Slider() {
	const { isScreenLg } = useResize()
	return (
		<div className={styles['slider']}>
			<Slide sideLeft={true} />
			{isScreenLg && <Slide sideLeft={false} />}
		</div>
	)
}
