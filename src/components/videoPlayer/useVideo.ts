import {
	ChangeEvent,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react'
import { IVideoElement } from '@/shared/types/videoPlayer.types'
import screenfull from 'screenfull'

let timeoutId: string | number | NodeJS.Timeout | undefined
export const useVideo = (isAutoPlay: boolean) => {
	const videoRef = useRef<IVideoElement>(null)
	const divRef = useRef<HTMLDivElement>(null)
	const [isPlaying, setIsPlaying] = useState(isAutoPlay)
	const [currentTime, setCurrentTime] = useState(0)
	const [videoTime, setVideoTime] = useState(0)
	const [progress, setProgress] = useState(0)
	const [isWaiting, setIsWaiting] = useState(false)
	const [volume, setVolume] = useState(1)
	const [prevVolume, setPrevVolume] = useState(0)
	const [showControls, setShowControls] = useState(false)

	useEffect(() => {
		const video = videoRef.current
		if (!video) return

		const handlePlayPause = () => {
			setIsPlaying(!video.paused)
		}
		video.addEventListener('play', handlePlayPause)
		video.addEventListener('pause', handlePlayPause)
		return () => {
			video.removeEventListener('play', handlePlayPause)
			video.removeEventListener('pause', handlePlayPause)
		}
	}, [isPlaying])

	useEffect(() => {
		const video = videoRef.current
		if (!video) return

		const handlePlayPause = () => {
			setVideoTime(video.duration)
		}
		video.addEventListener('loadedmetadata', handlePlayPause)
		return () => {
			video.removeEventListener('loadedmetadata', handlePlayPause)
		}
	}, [])

	const toggleVideo = useCallback(() => {
		const video = videoRef.current
		if (!video) return
		if (video.paused) {
			video?.play()
		} else {
			video?.pause()
		}
	}, [isPlaying])

	const fastForward = () => {
		if (videoRef.current) {
			videoRef.current.currentTime += 10

			setProgress((videoRef.current.currentTime / videoTime) * 100)
		}
	}

	const revert = () => {
		if (videoRef.current) {
			videoRef.current.currentTime -= 10

			setProgress((videoRef.current.currentTime / videoTime) * 100)
		}
	}

	const changeProgress = (e: ChangeEvent<HTMLInputElement>) => {
		const video = videoRef.current
		if (!video) return
		video.currentTime = (Number(e.target.value) * video.duration) / 100
		setProgress((video.currentTime / videoTime) * 100)
	}

	const changeVolume = (e: ChangeEvent<HTMLInputElement>) => {
		const video = videoRef.current
		if (!video) return
		video.volume = volume
		setVolume(Number(e.target.value))
	}

	const toggleVolume = () => {
		const video = videoRef.current
		if (!video) return
		if (volume !== 0) {
			setPrevVolume(volume)
			video.muted = true
			video.volume = 0
			setVolume(0)
		} else {
			video.muted = false
			video.volume = prevVolume
			setVolume(prevVolume)
		}
	}

	const toggleFullScreen = () => {
		const videoWrapper = divRef.current
		const video = videoRef.current
		if (!video) return
		if (!videoWrapper) return

		if (screenfull.isEnabled) {
			screenfull.toggle(videoWrapper)
		}
		//@ts-ignore
		video.webkitEnterFullscreen()
		// fullScreen on Ios
	}
	const handleMove = () => {
		setShowControls(true)
		clearTimeout(timeoutId)
		timeoutId = setTimeout(() => setShowControls(false), 1000)
		return () => {
			clearTimeout(timeoutId)
		}
	}
	// useEffect(() => {
	// 	// состояние для анимации появления и исчезновения контролеров
	// 	const video = videoRef.current
	// 	if (!video) return

	// 	video.addEventListener('mousemove', handleMove)
	// 	video.addEventListener('touchmove', handleMove)
	// 	return () => {
	// 		video.removeEventListener('mousemove', handleMove)
	// 		video.removeEventListener('touchmove', handleMove)
	// 		clearTimeout(timeoutId)
	// 	}
	// }, [toggleVideo, isPlaying])

	useEffect(() => {
		const video = videoRef.current
		if (!video) return

		const onWaiting = () => {
			setIsWaiting(true)
		}
		const removeWaiting = () => {
			setIsWaiting(false)
		}

		const updateProgress = () => {
			setCurrentTime(video.currentTime)
			setProgress((video.currentTime / videoTime) * 100 || 0)
		}

		video.addEventListener('timeupdate', updateProgress)
		video.addEventListener('waiting', onWaiting)
		video.addEventListener('canplay', removeWaiting)
		return () => {
			video.removeEventListener('timeupdate', updateProgress)
			video.removeEventListener('waiting', onWaiting)
			video.removeEventListener('canplay', removeWaiting)
		}
	}, [videoTime])

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			switch (e.key) {
				case 'f': {
					toggleFullScreen()
					break
				}
				case 'ArrowRight': {
					fastForward()
					break
				}

				case 'ArrowLeft': {
					revert()
					break
				}
				case ' ': {
					e.preventDefault()
					toggleVideo()
					break
				}
				default: {
					return
				}
			}
		}

		document.addEventListener('keydown', handleKeyDown)

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [toggleVideo])

	return useMemo(
		() => ({
			videoRef,
			divRef,
			actions: {
				toggleFullScreen,
				toggleVideo,
				changeProgress,
				changeVolume,
				toggleVolume,
				handleMove,
			},
			video: {
				isWaiting,
				isPlaying,
				currentTime,
				progress,
				videoTime,
				volume,
				showControls,
			},
		}),
		[
			currentTime,
			showControls,
			progress,
			isPlaying,
			videoTime,
			toggleVideo,
			volume,
			isWaiting,
		]
	)
}
