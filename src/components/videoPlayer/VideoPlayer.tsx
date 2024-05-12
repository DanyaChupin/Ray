'use client'
import Image from 'next/image'
import { useVideo } from './useVideo'
import inputStyle from './inputStyle.module.scss'
import cn from 'classnames'
import styles from './VideoPlayer.module.scss'

interface IVideoPlayer {
	isPrevies: boolean
}

export function VideoPlayer({ isPrevies }: IVideoPlayer) {
	const { actions, video, videoRef } = useVideo(isPrevies)

	return (
		<div className={styles['videoPlayer']}>
			<video
				src="/yoto.mp4"
				autoPlay={isPrevies}
				ref={videoRef}
				onClick={() => !isPrevies && actions.toggleVideo()}
				className={cn(styles['video'], {
					[styles['grab']]: isPrevies,
				})}
				playsInline
			/>
			<button
				onClick={actions.toggleVideo}
				className={cn(styles['controls__togglePlay'], {
					[styles['border']]: !isPrevies,
				})}
				draggable={false}
			>
				<Image
					className={cn(styles['togglePlay__img'], {
						[styles['mobileSize']]: isPrevies,
					})}
					src={video.isPlaying ? '/images/pause.svg' : '/images/play.svg'}
					width={11}
					height={13}
					loading="eager"
					alt={video.isPlaying ? 'пауза' : 'воспроизвести'}
					draggable={false}
				/>
			</button>
			<div
				className={cn(styles['controls'], {
					[styles['padding']]: isPrevies,
				})}
			>
				{!isPrevies && (
					<div className={styles['progress__wrapper']}>
						<span className={styles['controls__time']}>
							{Math.floor(video.currentTime / 60) +
								':' +
								('0' + Math.floor(video.currentTime % 60)).slice(-2)}
						</span>
						<div className={styles['controls__progress']}>
							<input
								min="0"
								max="100"
								step="0.1"
								onChange={actions.changeProgress}
								type="range"
								value={video.progress}
								className={inputStyle['progress']}
							/>
						</div>
						<span className={styles['controls__videoLength']}>
							{Math.floor(video.videoTime / 60) +
								':' +
								('0' + Math.floor(video.videoTime % 60)).slice(-2)}
						</span>
					</div>
				)}
				<div className={styles['option__wrapper']}>
					{!isPrevies && (
						<span className={styles['controls__quality']}>HQ/HD</span>
					)}
					<div className={styles['volume__wrapper']}>
						{!isPrevies && (
							<div className={styles['volume__positionRange']}>
								<input
									type="range"
									min="0"
									max="1"
									step="0.1"
									onChange={actions.changeVolume}
									value={video.volume}
									className={inputStyle['volume']}
								/>
							</div>
						)}
						<button
							className={styles['controls__volume']}
							onClick={actions.toggleVolume}
						>
							<Image
								className={styles['option__img']}
								src={
									video.volume ? '/images/volume.svg' : '/images/zeroVolume.svg'
								}
								width={25}
								height={15}
								loading="eager"
								alt="регулятор громкости"
							/>
						</button>
					</div>

					{!isPrevies && (
						<button
							className={styles['controls__fullScreen']}
							onClick={actions.fullScreen}
						>
							<Image
								className={styles['option__img']}
								src="/images/fullscreen.svg"
								width={25}
								height={15}
								loading="eager"
								alt="полный экран"
							/>
						</button>
					)}
				</div>
			</div>
		</div>
	)
}
