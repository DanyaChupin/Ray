import { useRef, useState } from 'react'
import Image from 'next/image'
import styles from './VideoPlayer.module.scss'

interface IVideoPlayer {
	isPrevies: boolean
}
export function VideoPlayer({ isPrevies }: IVideoPlayer) {
	const videoRef = useRef<HTMLVideoElement>(null)

	const [isPlaying, setIsPlaying] = useState(false)
	const [isVolume, setIsVolume] = useState(true)
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
			setIsVolume(!videoRef.current.muted)
		}
	}

	return (
		<div className={styles['videoPlayer']}>
			<video
				src="/yoto.mp4"
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
				{isPlaying ? (
					<Image
						src={'/images/play.svg'}
						width={30}
						height={37}
						loading="eager"
						alt={'воспроизвести'}
						draggable={false}
					/>
				) : (
					<Image
						src={'/images/pause.svg'}
						width={30}
						height={37}
						loading="eager"
						alt={'пауза'}
						draggable={false}
					/>
				)}
			</button>
			<div className={styles['controls']}>
				{!isPrevies && (
					<>
						<div className={styles['controls__time']}>00.00</div>
						<div className={styles['controls__progress']}>
							<input type="range" className={styles['progress']} />
						</div>
						<div className={styles['controls__videoLength']}>10.29</div>
						<div className={styles['controls__quality']}>HD</div>
						<button className={styles['controls__volume']}>
							<Image
								src="/images/volume.svg"
								width={22}
								height={22}
								loading="eager"
								alt="громкость"
							/>
						</button>
						<button className={styles['controls__fullScreen']}>
							<Image
								src="/images/fullscreen.svg"
								width={34 - 40}
								height={20}
								loading="eager"
								alt="полный экран"
							/>
						</button>
					</>
				)}
				<button className={styles['controls__volume']} onClick={toggleVolume}>
					{isVolume ? (
						<Image
							src="/images/volume.svg"
							width={20}
							height={20}
							loading="eager"
							alt="громкость"
						/>
					) : (
						<Image
							src="/images/zeroVolume.svg"
							width={20}
							height={20}
							loading="eager"
							alt="громкость"
						/>
					)}
				</button>
			</div>
		</div>
	)
}
