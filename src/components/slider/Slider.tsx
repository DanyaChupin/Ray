import { Slide } from '../slide/Slide'
import styles from './Slider.module.scss'

export function Slider({ screenSize }: { screenSize: boolean }) {
	return (
		<div className={styles['slider']}>
			<Slide sideLeft={true} />
			{screenSize && <Slide sideLeft={false} />}
		</div>
	)
}
