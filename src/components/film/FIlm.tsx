'use client'
import { Logo } from '@/components/Logo/Logo'
import { VideoPlayer } from '@/components/videoPlayer/VideoPlayer'
import { BackLink } from '@/components/backLink/BackLink'
import { Footer } from '@/components/footer/Footer'
import { ErrorMessage } from '@/components/errorMessage/ErrorMessage'
import Link from 'next/link'
import { useFilm } from '@/app/[locale]/films/[videoId]/useFIlm'
import styles from './Film.module.scss'
import { SkeletonFilm } from './SkeletonFilm'

export default function Film({
	params: { videoId },
}: {
	params: { videoId: string }
}) {
	const { data, isLoading, error } = useFilm(videoId)
	return (
		<div className={styles['film__wrapper']}>
			<div className={styles['film__top']}>
				{error ? (
					<ErrorMessage error={error.message} redirect="1" />
				) : (
					<>
						<header className={styles['film__header']}>
							<Link href={'/'}>
								<Logo />
							</Link>
						</header>
						<main className={styles['film']}>
							{isLoading && <SkeletonFilm />}
							{data && (
								<>
									<div className={styles['film__border']}>
										<VideoPlayer
											videoId={videoId}
											isAutoPlay={false}
											src={data.hls_url || ''}
											poster={data.screenshot || data.screenshots[0]}
											isPrevies={false}
										/>
									</div>
									<div className={styles['film__info']}>
										<p className={styles['film__name']}>{data.name}</p>
									</div>
								</>
							)}
						</main>
					</>
				)}
			</div>

			<div className={styles['film__bottom']}>
				<Footer>
					<BackLink />
				</Footer>
			</div>
		</div>
	)
}
