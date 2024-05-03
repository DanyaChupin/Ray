import { useRef, useState } from 'react'
import Image from 'next/image'
import styles from './VideoPlayer.module.scss'

interface IVideoPlayer {
	isPrevies: boolean
	removeVideo?: () => void
}
export function VideoPlayer({ isPrevies, removeVideo }: IVideoPlayer) {
	const videoRef = useRef<HTMLVideoElement>(null)

	const [isPlaying, setIsPlaying] = useState(false)

	const toggleVideo = () => {
		if (videoRef.current) {
			if (videoRef.current.paused) {
				videoRef.current.play()
				setIsPlaying(!isPlaying)
			} else {
				videoRef.current.pause()
				setIsPlaying(!isPlaying)
			}
		}
	}

	const toggleVolume = () => {
		if (videoRef.current) {
			videoRef.current.muted = !videoRef.current.muted
		}
	}

	return (
		<div className={styles['videoPlayer']}>
			<video
				src='/yoto.mp4'
				autoPlay={isPrevies}
				ref={videoRef}
				className={styles['video']}
				playsInline
			/>
			<button
				onClick={toggleVideo}
				className={styles['controls__togglePlay']}
				draggable={false}
			>
				<Image
					src={isPlaying ? '/images/play.svg' : '/images/pause.svg'}
					width={30}
					height={37}
					alt={isPlaying ? 'воспроизвести' : 'пауза'}
					draggable={false}
				/>
			</button>
			<div className={styles['controls']}>
				{!isPrevies && (
					<>
						<div className={styles['controls__time']}>00.00</div>
						<div className={styles['controls__progress']}>
							<input type='range' className={styles['progress']} />
						</div>
						<div className={styles['controls__videoLength']}>10.29</div>
						<div className={styles['controls__quality']}>HD</div>
						<button className={styles['controls__volume']}>
							<Image
								src='/images/volume.svg'
								width={22}
								height={22}
								alt='громкость'
							/>
						</button>
						<button className={styles['controls__fullScreen']}>
							<Image
								src='/images/fullscreen.svg'
								width={34 - 40}
								height={20}
								alt='полный экран'
							/>
						</button>
					</>
				)}
				<button className={styles['controls__volume']} onClick={toggleVolume}>
					<Image
						src='/images/volume.svg'
						width={20}
						height={20}
						alt='громкость'
					/>
				</button>
				<button
					className={styles['controls__close']}
					onClick={removeVideo}
					draggable={false}
				>
					<Image
						src='/images/close.svg'
						width={20}
						height={20}
						alt='закрыть'
						draggable={false}
					/>
				</button>
			</div>
		</div>
	)
}
