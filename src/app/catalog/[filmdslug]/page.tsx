import { Logo } from '@/components/Logo/Logo'
import styles from './FilmPage.module.scss'
import { VideoPlayer } from '@/components/videoPlayer/VideoPlayer'
import { BackLink } from '@/components/backLink/BackLink'
import { Footer } from '@/components/footer/Footer'

export default function FilmPage() {
	return (
		<div className={styles['film__wrapper']}>
			<Logo />
			<div className={styles['film']}>
				<div className={styles['film__border']}>
					<VideoPlayer isPrevies={false} />
				</div>
				<div className={styles['film__info']}>
					<p className={styles['film__name']}>
						Nike SB | Yuto Horigome in Tokyo
					</p>
					<p className={styles['film__author']}>Yoto Horigome</p>
				</div>
			</div>
			<div className={styles['film__bottom']}>
				<Footer>
					<BackLink returnBackUrl="/catalog" />
				</Footer>
			</div>
		</div>
	)
}
