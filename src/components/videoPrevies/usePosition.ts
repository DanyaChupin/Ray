'useClient'
import {
	Dispatch,
	MouseEvent,
	SetStateAction,
	TouchEvent,
	useState,
} from 'react'

export function usePosition(setIsDragging: Dispatch<SetStateAction<boolean>>) {
	const screenSize = window.screen

	const halfScreenWidth = screenSize.width / 2
	const halfScreenHeight = screenSize.height / 2

	//Случайный размер видео превью
	function generateRandomSize() {
		let initHeight = Math.floor(
			Math.random() * (screenSize.height - 308 + 1) + 208
		)
		let initWidth = Math.floor(
			Math.random() * (halfScreenWidth - 266 + 1) + 266
		)
		if (initWidth > screenSize.width) {
			initWidth = initWidth / 2
		}
		if (initHeight > initWidth) {
			initHeight = initWidth
		}
		return { initWidth, initHeight }
	}

	// Случайная позиция видео превью
	function generateCoordinates() {
		const x = Math.floor(Math.random() * screenSize.width - 200)
		const y =
			Math.floor(Math.random() * 100 + halfScreenHeight) - halfScreenHeight / 2
		return { x, y }
	}

	//////////////////////////

	const [position, setPosition] = useState(generateCoordinates())

	const handleMouseDown = (e: MouseEvent) => {
		setIsDragging(true)
		const offsetX = e.clientX - position.x
		const offsetY = e.clientY - position.y

		const handleMouseMove = (e: MouseEvent) => {
			setPosition({
				x: e.clientX - offsetX,
				y: e.clientY - offsetY,
			})
		}

		const handleMouseUp = () => {
			setIsDragging(false)
			document.removeEventListener('mousemove', handleMouseMove as any)
			document.removeEventListener('mouseup', handleMouseUp)
		}
		document.addEventListener('mousemove', handleMouseMove as any)
		document.addEventListener('mouseup', handleMouseUp)
	}

	const handleTouchStart = (e: TouchEvent) => {
		const offsetX = e.touches[0].clientX - position.x
		const offsetY = e.touches[0].clientY - position.y

		const handleTouchMove = (e: TouchEvent) => {
			setPosition({
				x: e.touches[0].clientX - offsetX,
				y: e.touches[0].clientY - offsetY,
			})
		}

		const handleTouchEnd = () => {
			document.removeEventListener('touchmove', handleTouchMove as any)
			document.removeEventListener('touchend', handleTouchEnd)
		}

		document.addEventListener('touchmove', handleTouchMove as any)
		document.addEventListener('touchend', handleTouchEnd)
	}

	return {
		generateRandomSize,
		generateCoordinates,
		position,
		handleMouseDown,
		handleTouchStart,
	}
}
