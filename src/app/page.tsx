import { Slider } from './components/slider/Slider'
import styles from './Home.module.scss'

export default function HomePage() {
	return (
		<main className={styles['home']}>
			<Slider />
			Home
		</main>
	)
}
