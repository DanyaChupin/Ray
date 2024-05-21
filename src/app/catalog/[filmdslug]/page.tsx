import { Logo } from '@/components/Logo/Logo'
import { VideoPlayer } from '@/components/videoPlayer/VideoPlayer'
import { BackLink } from '@/components/backLink/BackLink'
import { Footer } from '@/components/footer/Footer'
import styles from './FilmPage.module.scss'

export default function FilmPage() {
	return (
		<div className={styles['film__wrapper']}>
			<header className={styles['film__header']}>
				<Logo />
			</header>
			<main className={styles['film']}>
				<div className={styles['film__border']}>
					<VideoPlayer autoPlay={false} isPrevies={false} />
				</div>
				<div className={styles['film__info']}>
					<p className={styles['film__name']}>
						Nike SB | Yuto Horigome in Tokyo
					</p>
					<p className={styles['film__author']}>Yoto Horigome</p>
				</div>
			</main>

			<div className={styles['film__bottom']}>
				<Footer>
					<BackLink returnBackUrl="/catalog" />
				</Footer>
			</div>
		</div>
	)
}
