import {
	ChangeEvent,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react'
import { IVideoElement } from '@/shared/types/video.types'
import screenfull from 'screenfull'

export const useVideo = (isAutoPlay: boolean, isPrevies: boolean) => {
	const videoRef = useRef<IVideoElement>(null)
	const divRef = useRef<HTMLDivElement>(null)
	const [isPlaying, setIsPlaying] = useState(isAutoPlay)
	const [currentTime, setCurrentTime] = useState(0)
	const [videoTime, setVideoTime] = useState(0)
	const [progress, setProgress] = useState(0)
	const [isWaiting, setIsWaiting] = useState(false)
	const [volume, setVolume] = useState(1)
	const [prevVolume, setPrevVolume] = useState(0)
	const [showControls, setShowControls] = useState(!isPrevies)

	useEffect(() => {
		if (!divRef.current) return
		let timeoutId: string | number | NodeJS.Timeout | undefined

		const handleMove = () => {
			setShowControls(true)
			clearTimeout(timeoutId)
			timeoutId = setTimeout(() => setShowControls(false), 1500)
		}

		divRef.current.addEventListener('mousemove', handleMove)
		divRef.current.addEventListener('touchmove', handleMove)

		return () => {
			if (divRef.current) {
				divRef.current.removeEventListener('mousemove', handleMove)
				divRef.current.removeEventListener('touchmove', handleMove)
				clearTimeout(timeoutId)
			}
		}
	}, [])

	useEffect(() => {
		if (videoRef.current?.duration) {
			setVideoTime(videoRef.current.duration)
		}
	}, [videoRef.current?.duration])

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

	const fullScreen = () => {
		const fullScreenBlock = divRef.current
		const video = videoRef.current
		if (!fullScreenBlock) return
		if (!video) return

		if (screenfull.isEnabled) {
			screenfull.toggle(fullScreenBlock)
		} else {
			screenfull.toggle(video)
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
				case 'f': {
					fullScreen()
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
				fullScreen,
				toggleVideo,
				changeProgress,
				changeVolume,
				toggleVolume,
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
			progress,
			isPlaying,
			videoTime,
			toggleVideo,
			volume,
			isWaiting,
		]
	)
}
