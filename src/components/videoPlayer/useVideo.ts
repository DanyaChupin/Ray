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

	const [isPlaying, setIsPlaying] = useState(isAutoPlay)
	const [currentTime, setCurrentTime] = useState(0)
	const [videoTime, setVideoTime] = useState(0)
	const [progress, setProgress] = useState(0)
	const [volume, setVolume] = useState(1)

	useEffect(() => {
		if (videoRef.current?.duration) {
			setVideoTime(videoRef.current.duration)
		}
	}, [videoRef.current?.duration])

	const toggleVideo = useCallback(() => {
		if (!isPlaying) {
			videoRef.current?.play()
			setIsPlaying(true)
		} else {
			videoRef.current?.pause()
			setIsPlaying(false)
		}
	}, [isPlaying])

	const fastForward = () => {
		if (videoRef.current) videoRef.current.currentTime += 5
	}

	const changeProgress = (e: ChangeEvent<HTMLInputElement>) => {
		if (!videoRef.current) return
		videoRef.current.currentTime =
			(Number(e.target.value) * videoRef.current.duration) / 100
	}

	const changeVolume = (e: ChangeEvent<HTMLInputElement>) => {
		if (!videoRef.current) return
		setVolume(Number(e.target.value))

		videoRef.current.volume = volume
	}
	const toggleVolume = () => {
		if (!videoRef.current) return
		if (volume !== 0) {
			videoRef.current.volume = 0
			setVolume(0)
		} else {
			videoRef.current.volume = 1
			setVolume(1)
		}
	}
	const revert = () => {
		if (videoRef.current) videoRef.current.currentTime -= 5
	}

	const fullScreen = () => {
		const video = videoRef.current

		if (!video) return

		if (video.requestFullscreen) {
			video.requestFullscreen()
		} else if (video.msRequestFullscreen) {
			video.msRequestFullscreen()
		} else if (video.mozRequestFullScreen) {
			video.mozRequestFullScreen()
		} else if (video.webkitRequestFullscreen) {
			video.webkitRequestFullscreen()
		}
	}

	useEffect(() => {
		const video = videoRef.current
		if (!video) return

		const updateProgress = () => {
			setCurrentTime(video.currentTime)
			setProgress((video.currentTime / videoTime) * 100)
		}

		video.addEventListener('timeupdate', updateProgress)

		return () => {
			video.removeEventListener('timeupdate', updateProgress)
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
			actions: {
				fullScreen,
				revert,
				fastForward,
				toggleVideo,
				changeProgress,
				changeVolume,
				toggleVolume,
			},
			video: {
				isPlaying,
				currentTime,
				progress,
				videoTime,
				volume,
			},
		}),
		[currentTime, progress, isPlaying, videoTime, toggleVideo, volume]
	)
}
