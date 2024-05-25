'use client'
import { Logo } from '@/components/Logo/Logo'
import { VideoPlayer } from '@/components/videoPlayer/VideoPlayer'
import { BackLink } from '@/components/backLink/BackLink'
import { Footer } from '@/components/footer/Footer'
import { useFilm } from './useFIlm'
import { SkeletonFilm } from './SkeletonFilm'
import { ErrorMessage } from '@/components/errorMessage/ErrorMessage'
import styles from './FilmPage.module.scss'

export default function FilmPage({
	params: { videoId },
}: {
	params: { videoId: string }
}) {
	const { data, isLoading, error } = useFilm(videoId)
	console.log(isLoading)
	return (
		<div className={styles['film__wrapper']}>
			<header className={styles['film__header']}>
				<Logo />
			</header>
			<main className={styles['film']}>
				{isLoading && <SkeletonFilm />}
				{error && <ErrorMessage error={error.message} redirect="/catalog" />}
				{data && (
					<>
						<div className={styles['film__border']}>
							<VideoPlayer
								src={data?.assets.mp4 || ''}
								poster={data?.assets.thumbnail || ''}
								autoPlay={false}
								isPrevies={false}
							/>
						</div>
						<div className={styles['film__info']}>
							<p className={styles['film__name']}>{data?.title}</p>
							<p className={styles['film__author']}>{data?.description}</p>
						</div>
					</>
				)}
			</main>

			<div className={styles['film__bottom']}>
				<Footer>
					<BackLink returnBackUrl="/catalog" />
				</Footer>
			</div>
		</div>
	)
}
