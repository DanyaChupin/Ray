import { IVideoElement } from '@/shared/types/video.types'
import {
	ChangeEvent,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react'

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
	const [isFullScreen, setIsFullScreen] = useState(false)

	const [showControls, setShowControls] = useState(true)
	useEffect(() => {
		let timeoutId: string | number | NodeJS.Timeout | undefined

		const handleMove = () => {
			setShowControls(true)
			clearTimeout(timeoutId)
			timeoutId = setTimeout(() => setShowControls(false), 1500)
		}

		document.addEventListener('mousemove', handleMove)
		document.addEventListener('touchmove', handleMove)

		return () => {
			document.removeEventListener('mousemove', handleMove)
			document.removeEventListener('touchmove', handleMove)
			clearTimeout(timeoutId)
		}
	}, [])

	useEffect(() => {
		if (videoRef.current?.duration) {
			setVideoTime(videoRef.current.duration)
		}
	}, [videoRef.current?.duration])

	useEffect(() => {
		if (videoRef.current?.paused) {
			setIsPlaying(false)
		} else {
			setIsPlaying(true)
		}
	}, [videoRef.current?.paused])

	const toggleVideo = useCallback(() => {
		if (isWaiting) setIsWaiting(false)
		if (!isPlaying) {
			videoRef.current?.play()
			setIsPlaying(true)
		} else {
			videoRef.current?.pause()
			setIsPlaying(false)
		}
	}, [isPlaying])

	const fastForward = () => {
		console.log(videoRef.current?.currentTime)
		if (videoRef.current) {
			videoRef.current.currentTime += 10
		}
	}

	const changeProgress = (e: ChangeEvent<HTMLInputElement>) => {
		if (!videoRef.current) return
		videoRef.current.currentTime =
			(Number(e.target.value) * videoRef.current.duration) / 100
	}

	const changeVolume = (e: ChangeEvent<HTMLInputElement>) => {
		if (!videoRef.current) return
		videoRef.current.volume = volume
		setVolume(Number(e.target.value))
	}
	const toggleVolumeMobile = () => {
		if (!videoRef.current) return
		if (videoRef.current.muted) {
			videoRef.current.muted = false
		} else {
			videoRef.current.muted = true
		}
	}
	const toggleVolume = () => {
		if (!videoRef.current) return
		if (volume !== 0) {
			setPrevVolume(volume)
			videoRef.current.muted = true
			videoRef.current.volume = 0
			setVolume(0)
		} else {
			videoRef.current.muted = false
			videoRef.current.volume = prevVolume
			setVolume(prevVolume)
		}
	}
	const revert = () => {
		if (videoRef.current) videoRef.current.currentTime -= 10
	}

	const fullScreen = () => {
		const fullScreenBlock = divRef.current
		if (!fullScreenBlock) return

		if (!document.fullscreenElement) {
			setIsFullScreen(true)
			fullScreenBlock.requestFullscreen()
		} else {
			setIsFullScreen(false)
			document.exitFullscreen()
		}
	}

	useEffect(() => {
		const video = videoRef.current
		if (!video) return

		const onWaiting = () => {
			setIsWaiting(true)
		}

		const updateProgress = () => {
			setIsWaiting(false)
			setCurrentTime(video.currentTime)
			setProgress((video.currentTime / videoTime) * 100)
		}

		video.addEventListener('timeupdate', updateProgress)
		video.addEventListener('waiting', onWaiting)

		return () => {
			video.removeEventListener('timeupdate', updateProgress)
			video.removeEventListener('waiting', onWaiting)
		}
	}, [videoTime])

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			switch (e.key) {
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

				case 'f': {
					fullScreen()
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
				fullScreen,
				revert,
				fastForward,
				toggleVideo,
				changeProgress,
				changeVolume,
				toggleVolume,
				toggleVolumeMobile,
			},
			video: {
				isWaiting,
				isPlaying,
				currentTime,
				progress,
				videoTime,
				volume,
				isFullScreen,
				showControls,
			},
		}),
		[
			currentTime,
			progress,
			isPlaying,
			videoTime,
			toggleVideo,
			volume,
			isWaiting,
		]
	)
}
