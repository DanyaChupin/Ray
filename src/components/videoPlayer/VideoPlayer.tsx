'use client'
import { Dispatch, MouseEvent, SetStateAction, TouchEvent } from 'react'
import Image from 'next/image'
import { useVideo } from './useVideo'
import cn from 'classnames'
import { Spinner } from '../spinner/Spinner'
import inputStyle from './inputStyle.module.scss'
import screenfull from 'screenfull'
import styles from './VideoPlayer.module.scss'

interface IVideoPlayer {
	isPrevies: boolean
	removeVideo?: () => void
	onTouchStart?: (e: TouchEvent) => void
	onMouseDown?: (e: MouseEvent) => void
	autoPlay: boolean
	src: string
	poster: string
	onLoadLocal?: Dispatch<SetStateAction<boolean>>
}

export function VideoPlayer({
	isPrevies,
	removeVideo,
	onTouchStart,
	onMouseDown,
	autoPlay,
	src,
	poster,
	onLoadLocal,
}: IVideoPlayer) {
	const { actions, video, videoRef, divRef } = useVideo(autoPlay)
	console.log(video.showControls)
	return (
		<div
			ref={divRef}
			className={styles['videoPlayer']}
			onMouseMove={actions.handleMove}
			onTouchMove={actions.handleMove}
		>
			<video
				poster={poster}
				onLoadedData={() => {
					onLoadLocal && onLoadLocal(false)
					actions.handleMove()
				}}
				preload="metadata"
				src={src}
				autoPlay={autoPlay}
				x-webkit-airplay="allow"
				x5-video-player-type="h5"
				x5-video-player-fullscreen="true"
				x5-video-orientation="portraint"
				ref={videoRef}
				className={cn(styles['video'], {
					[styles['grab']]: isPrevies,
					[styles['fullScreenVideo']]: screenfull.isFullscreen,
				})}
				playsInline
				controls={false}
			/>
			{video.isWaiting ? (
				<Spinner />
			) : (
				<button
					onClick={actions.toggleVideo}
					className={cn(styles['controls__togglePlay'], {
						[styles['border']]: !isPrevies,
						[styles['showControls']]: video.showControls,
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
			)}
			{isPrevies && (
				<>
					<button
						className={cn(styles['videoPlayer__close'], {
							[styles['showControls']]: video.showControls,
						})}
						onClick={removeVideo}
						draggable={false}
					>
						<Image
							src="/images/close.svg"
							width={25}
							height={25}
							loading="eager"
							alt="закрыть"
							draggable={false}
						/>
					</button>
					<div
						className={cn(styles['videoPlayer__resize'], {
							[styles['showControls']]: video.showControls,
						})}
						onTouchStart={onTouchStart}
						onMouseDown={onMouseDown}
					/>
				</>
			)}
			<div
				className={cn(styles['controls'], {
					[styles['padding']]: isPrevies,
					[styles['showControls']]: video.showControls,
				})}
			>
				{!isPrevies && (
					<div className={styles['progress__wrapper']}>
						<span className={styles['controls__time']}>
							{Math.floor(video.currentTime / 60) +
								'.' +
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
								'.' +
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
							onClick={actions.toggleFullScreen}
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
