import Hls from 'hls.js'
import {
	ChangeEvent,
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react'
import { IVideoElement } from '@/shared/types/videoPlayer.types'
import screenfull from 'screenfull'
import { useScreenSize } from '@/hooks/useScreenSize'

interface VideoTimeouts {
	[key: string]: NodeJS.Timeout
}
interface VideoHls {
	[key: string]: Hls
}
const videoTimeouts: VideoTimeouts = {}
const videosHls: VideoHls = {}
export const useVideo = (
	isAutoPlay: boolean,
	src: string,
	videoId: string,
	onLoadLocal?: Dispatch<SetStateAction<boolean>>
) => {
	const videoRef = useRef<IVideoElement>(null)
	const divRef = useRef<HTMLDivElement>(null)
	const buttonRef = useRef<HTMLButtonElement>(null)
	const [isPlaying, setIsPlaying] = useState(false)
	const [currentTime, setCurrentTime] = useState(0)
	const [videoTime, setVideoTime] = useState(0)
	const [progress, setProgress] = useState(0)
	const [isWaiting, setIsWaiting] = useState(false)
	const [volume, setVolume] = useState(1)
	const [prevVolume, setPrevVolume] = useState(0)
	const [showControls, setShowControls] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [quality, setQuality] = useState(-1)

	const { isScreenLg } = useScreenSize()
	// -1 = autoQuality; 1 = maxQuality
	useEffect(() => {
		const video = videoRef.current
		if (!video) return
		if (Hls.isSupported()) {
			videosHls[videoId] = new Hls()
		}

		videosHls[videoId].loadSource(src)
		videosHls[videoId].attachMedia(video)
		return () => {
			videosHls[videoId].destroy()
			delete videosHls[videoId]
		}
	}, [isAutoPlay, src, videoId])

	const changeQuality = () => {
		if (videosHls[videoId]) {
			if (quality !== 1) {
				videosHls[videoId].loadLevel = videosHls[videoId].levels.length - 1
				setQuality(1)
				return
			}
			if (quality === 1) {
				videosHls[videoId].currentLevel = -1
				setQuality(-1)
				return
			}
		}
	}
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

		const handleVideoTime = () => {
			setVideoTime(video.duration)
		}
		video.addEventListener('loadedmetadata', handleVideoTime)
		return () => {
			video.removeEventListener('loadedmetadata', handleVideoTime)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	useEffect(() => {
		const video = videoRef.current
		if (!video) return

		const handleOffLoading = () => {
			setIsLoading(false)
			!isAutoPlay && setShowControls(true)
			isAutoPlay && video.play()
			if (onLoadLocal) {
				onLoadLocal(false)
			}
		}
		const handleOnLoading = () => {
			setIsLoading(true)
		}
		video.addEventListener('loadedmetadata', handleOffLoading)
		video.addEventListener('loadstart', handleOnLoading)
		return () => {
			video.removeEventListener('loadedmetadata', handleOffLoading)
			video.removeEventListener('loadstart', handleOnLoading)
		}
	}, [isAutoPlay, isLoading, onLoadLocal])

	const toggleVideo = useCallback(() => {
		const video = videoRef.current
		if (!video) return
		if (video.paused) {
			video.play()
		} else {
			video.pause()
		}
	}, [])

	const fastForward = useCallback(() => {
		if (videoRef.current) {
			videoRef.current.currentTime += 10

			setProgress((videoRef.current.currentTime / videoTime) * 100)
		}
	}, [videoTime])

	const revert = useCallback(() => {
		if (videoRef.current) {
			videoRef.current.currentTime -= 10

			setProgress((videoRef.current.currentTime / videoTime) * 100)
		}
	}, [videoTime])

	const changeProgress = (e: ChangeEvent<HTMLInputElement>) => {
		const video = videoRef.current
		if (!video) return
		video.currentTime = (Number(e.target.value) * video.duration) / 100
		setProgress((video.currentTime / videoTime) * 100)
	}

	const changeVolume = (e: ChangeEvent<HTMLInputElement>) => {
		const video = videoRef.current
		if (!video) return
		if (Number(e.target.value) === 0) {
			video.muted = true
			video.volume = volume
			setVolume(0)
		} else {
			video.muted = false
			video.volume = volume
			setVolume(Number(e.target.value))
		}
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
		if (!isScreenLg) {
			//@ts-ignore
			video.webkitEnterFullscreen()
			// fullScreen on Ios
		}
	}
	const handleMove = (videoId: string) => {
		if (videoTimeouts[videoId]) {
			clearTimeout(videoTimeouts[videoId])
		}

		setShowControls(true)
		videoTimeouts[videoId] = setTimeout(() => {
			// Действия по истечении времени для конкретного видео
			setShowControls(false)
		}, 1000)
	}

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
	}, [fastForward, revert, toggleVideo])

	return useMemo(
		() => ({
			videoRef,
			divRef,
			buttonRef,
			actions: {
				toggleFullScreen,
				toggleVideo,
				changeProgress,
				changeVolume,
				toggleVolume,
				handleMove,
				setShowControls,
				changeQuality,
			},
			video: {
				isWaiting,
				isPlaying,
				quality,
				currentTime,
				progress,
				videoTime,
				volume,
				isLoading,
				showControls,
			},
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[
			currentTime,
			quality,
			isLoading,
			showControls,
			isWaiting,
			progress,
			volume,
			isPlaying,
			videoTime,
		]
	)
}
