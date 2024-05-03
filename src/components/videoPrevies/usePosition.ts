'useClient'
import { MouseEvent, TouchEvent, useState } from 'react'

export function usePosition() {
	const screenSize = window.screen
	const halfScreenWidth = screenSize.width / 2
	const halfScreenHeight = screenSize.height / 2

	//Случайный размер видео превью
	function generateRandomSize() {
		let height = Math.floor(Math.random() * (screenSize.height - 308 + 1) + 208)
		let width = Math.floor(Math.random() * (halfScreenWidth - 266 + 1) + 266)
		if (width > screenSize.width) {
			width = width / 2
		}
		if (height > width) {
			height = width
		}
		return { width, height }
	}

	// Случайная позиция видео превью
	function generateCoordinates() {
		const x = Math.floor(Math.random() * halfScreenWidth)
		const y = Math.floor(Math.random() * 100 + halfScreenHeight) - 200
		return { x, y }
	}
	const [position, setPosition] = useState(generateCoordinates())
	const [isDragging, setIsDragging] = useState(false)

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
		position,
		isDragging,
		handleMouseDown,
		handleTouchStart,
	}
}
