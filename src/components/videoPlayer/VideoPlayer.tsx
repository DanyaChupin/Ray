'use client'
import { Dispatch, MouseEvent, SetStateAction, TouchEvent } from 'react'
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
	src: string
	poster: string
	onLoadLocal?: Dispatch<SetStateAction<boolean>>
	videoId: string
	isAutoPlay: boolean
}

export function VideoPlayer({
	videoId,
	isPrevies,
	removeVideo,
	onTouchStart,
	onMouseDown,
	isAutoPlay,
	src,
	poster,
	onLoadLocal,
}: IVideoPlayer) {
	const { actions, video, videoRef, divRef, buttonRef } = useVideo(
		isAutoPlay,
		src,
		videoId,
		onLoadLocal
	)
	return (
		<div
			onMouseMove={() => actions.handleMove(videoId)}
			onTouchMove={() => actions.handleMove(videoId)}
			ref={divRef}
			className={cn(styles['videoPlayer'], {
				[styles['cursorno']]: !video.showControls && screenfull.isFullscreen,
			})}
		>
			<video
				poster={poster}
				preload="metadata"
				autoPlay={isAutoPlay}
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
			{video.isWaiting || video.isLoading ? (
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
					{!video.isPlaying ? (
						<svg
							className={cn(styles['togglePlay__img'], {
								[styles['mobileSize']]: isPrevies,
							})}
							height="20px"
							width="20px"
							version="1.1"
							id="Capa_1"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 32 32"
							fill="#fff"
						>
							<g id="SVGRepo_tracerCarrier" />

							<g id="SVGRepo_iconCarrier">
								<g>
									<g id="play">
										<polygon points="4,0 28,16 4,32 " />
									</g>
								</g>
							</g>
						</svg>
					) : (
						<svg
							className={cn(styles['togglePlay__img'], {
								[styles['mobileSize']]: isPrevies,
							})}
							width="20px"
							height="20px"
							viewBox="0 0 31 39"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<rect
								x="0.826904"
								y="0.181641"
								width="11.0632"
								height="37.9308"
								fill="white"
							/>
							<rect
								x="19.7922"
								y="0.181641"
								width="11.0632"
								height="37.9308"
								fill="white"
							/>
						</svg>
					)}
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
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0,0,256,256"
							width="25px"
							height="25px"
						>
							<g fill="#ffffff" stroke="none">
								<g transform="scale(5.12,5.12)">
									<path d="M7.71875,6.28125l-1.4375,1.4375l17.28125,17.28125l-17.28125,17.28125l1.4375,1.4375l17.28125,-17.28125l17.28125,17.28125l1.4375,-1.4375l-17.28125,-17.28125l17.28125,-17.28125l-1.4375,-1.4375l-17.28125,17.28125z"></path>
								</g>
							</g>
						</svg>
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
					[styles['showControls']]: video.showControls && !video.isLoading,
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
						<button
							ref={buttonRef}
							className={styles['controls__quality']}
							onClick={actions.changeQuality}
						>
							<span
								className={cn({
									[styles['activeQuality']]: video.quality !== -1,
								})}
							>
								HQ
							</span>
							/
							<span
								className={cn({
									[styles['activeQuality']]: video.quality === -1,
								})}
							>
								AUTO
							</span>
						</button>
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
							{video.volume >= 0.5 ? (
								<svg
									className={styles['option__img']}
									width="23"
									height="20"
									viewBox="0 0 23 20"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M0.609863 12.627V7.95401C0.609863 7.40172 1.05758 6.95401 1.60986 6.95401H5.17856C5.45662 6.95401 5.72214 6.83823 5.91135 6.63446L11.1109 1.03491C11.7294 0.368897 12.8437 0.806495 12.8437 1.71536V18.8657C12.8437 19.7746 11.7294 20.2122 11.1109 19.5462L5.91135 13.9466C5.72214 13.7428 5.45662 13.627 5.17855 13.627H1.60986C1.05758 13.627 0.609863 13.1793 0.609863 12.627Z"
										fill="white"
									/>
									<path
										d="M17.2924 10.2905C17.2924 8.80693 16.6262 7.94789 16.023 7.47415C15.8851 7.36587 15.9864 6.95401 16.1617 6.95401C16.174 6.95401 16.1849 6.95514 16.1968 6.9585C16.3997 7.016 18.4046 7.65082 18.4046 10.2905C18.4046 12.9302 16.3997 13.565 16.1968 13.6225C16.1849 13.6259 16.174 13.627 16.1617 13.627C15.9864 13.627 15.8851 13.2152 16.023 13.1069C16.6262 12.6331 17.2924 11.7741 17.2924 10.2905Z"
										fill="white"
									/>
									<path
										d="M22.8533 10.2905C22.8533 5.30293 17.6774 2.53357 15.7662 1.68099C15.4294 1.53076 15.0681 1.78108 15.0681 2.14984C15.0681 2.36511 15.1946 2.55858 15.3891 2.65079C16.7209 3.28207 21.7411 5.9496 21.7411 10.2905C21.7411 14.6314 16.7209 17.299 15.3891 17.9302C15.1946 18.0224 15.0681 18.2159 15.0681 18.4312C15.0681 18.7999 15.4294 19.0503 15.7662 18.9C17.6774 18.0475 22.8533 15.2781 22.8533 10.2905Z"
										fill="white"
									/>
								</svg>
							) : video.volume !== 0 ? (
								<svg
									className={styles['option__img']}
									width="23"
									height="20"
									viewBox="0 0 18 20"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M0 12.4582V7.78518C0 7.2329 0.447715 6.78518 1 6.78518H4.56869C4.84676 6.78518 5.11227 6.6694 5.30149 6.46564L10.5011 0.866085C11.1195 0.200074 12.2339 0.637672 12.2339 1.54654V18.6969C12.2339 19.6057 11.1195 20.0433 10.5011 19.3773L5.30149 13.7778C5.11227 13.574 4.84676 13.4582 4.56869 13.4582H1C0.447715 13.4582 0 13.0105 0 12.4582Z"
										fill="white"
									/>
									<path
										d="M16.6825 10.1217C16.6825 8.63811 16.0164 7.77907 15.4131 7.30533C15.2753 7.19705 15.3765 6.78518 15.5518 6.78518C15.5641 6.78518 15.575 6.78631 15.5869 6.78967C15.7898 6.84717 17.7947 7.48199 17.7947 10.1217C17.7947 12.7614 15.7898 13.3962 15.5869 13.4537C15.575 13.4571 15.5641 13.4582 15.5518 13.4582C15.3765 13.4582 15.2753 13.0463 15.4131 12.9381C16.0164 12.4643 16.6825 11.6053 16.6825 10.1217Z"
										fill="white"
									/>
								</svg>
							) : (
								<svg
									className={styles['option__img']}
									width="23"
									height="20"
									viewBox="0 0 13 20"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M0 12.4582V7.78518C0 7.2329 0.447715 6.78518 1 6.78518H4.56869C4.84676 6.78518 5.11227 6.6694 5.30149 6.46564L10.5011 0.866085C11.1195 0.200074 12.2339 0.637672 12.2339 1.54654V18.6969C12.2339 19.6057 11.1195 20.0433 10.5011 19.3773L5.30149 13.7778C5.11227 13.574 4.84676 13.4582 4.56869 13.4582H1C0.447715 13.4582 0 13.0105 0 12.4582Z"
										fill="white"
									/>
								</svg>
							)}
						</button>
					</div>

					{!isPrevies && (
						<button
							className={styles['controls__fullScreen']}
							onClick={actions.toggleFullScreen}
						>
							<svg
								className={styles['option__img']}
								width="36"
								height="23"
								viewBox="0 0 36 23"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M0.760254 14.1096V22.1276H12.7872" stroke="white" />
								<path
									d="M12.7876 1.28088L0.760649 1.28088L0.760649 9.29885"
									stroke="white"
								/>
								<path d="M23.2109 22.1276H35.2379V14.1096" stroke="white" />
								<path
									d="M35.2373 9.29895V1.28099L23.2104 1.28099"
									stroke="white"
								/>
							</svg>
						</button>
					)}
				</div>
			</div>
		</div>
	)
}
