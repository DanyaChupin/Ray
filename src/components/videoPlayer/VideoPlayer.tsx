'use client'
import Image from 'next/image'
import { useVideo } from './useVideo'
import inputStyle from './inputStyle.module.scss'
import styles from './VideoPlayer.module.scss'

interface IVideoPlayer {
	isPrevies: boolean
}

export function VideoPlayer({ isPrevies }: IVideoPlayer) {
	const { actions, video, videoRef } = useVideo()
	return (
		<div className={styles['videoPlayer']}>
			<video
				src="/yoto.mp4"
				autoPlay={isPrevies}
				ref={videoRef}
				onClick={actions.toggleVideo}
				className={styles['video']}
				playsInline
			/>
			<button
				onClick={actions.toggleVideo}
				className={styles['controls__togglePlay']}
				draggable={false}
			>
				<Image
					src={video.isPlaying ? '/images/pause.svg' : '/images/play.svg'}
					width={30}
					height={37}
					loading="lazy"
					alt={video.isPlaying ? 'пауза' : 'воспроизвести'}
					draggable={false}
				/>
			</button>
			<div className={styles['controls']}>
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
						<div className={styles['volume__position']}>
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
						<button className={styles['controls__volume']}>
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
