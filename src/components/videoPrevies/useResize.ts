import { MouseEvent, TouchEvent } from 'react'

interface IUseResize {
	width: number
	height: number
	changeSize: (width: number, height: number) => void
	changeZIndex: () => void
}

const minWidth = 200
const minHeight = 200

export function useResize({
	width,
	height,
	changeSize,
	changeZIndex,
}: IUseResize) {
	const maxHeight = window.screen.height / 1.1
	const maxWidth = window.screen.width / 1.1

	// Изменение размера videoPrevies на телефоне
	const onTouchStart = (e: TouchEvent) => {
		e.stopPropagation()
		changeZIndex()
		const initialX = e.touches[0].clientX
		const initialY = e.touches[0].clientY

		const handleTouchMove = (e: TouchEvent) => {
			const deltaX = e.touches[0].clientX - initialX
			const deltaY = e.touches[0].clientY - initialY

			let newWidth = Math.floor(width + deltaX)
			let newHeight = Math.floor(height + deltaY)

			if (newWidth <= minWidth) {
				newWidth = minWidth
			}
			if (newHeight <= minHeight) {
				newHeight = minHeight
			}
			if (newWidth >= maxWidth) {
				newWidth = maxWidth
			}
			if (newHeight >= maxHeight) {
				newHeight = maxHeight
			}
			changeSize(newWidth, newHeight)
		}
		const handleTouchEnd = () => {
			document.removeEventListener('touchmove', handleTouchMove as any)
			document.removeEventListener('touchend', handleTouchEnd)
		}
		document.addEventListener('touchmove', handleTouchMove as any)
		document.addEventListener('touchend', handleTouchEnd)
	}

	// Изменение размера videoPrevies на дестоп
	const onMouseDown = (e: MouseEvent) => {
		e.stopPropagation()
		changeZIndex()
		// Начать изменение размера при нажатии на треугольник
		const initialX = e.clientX
		const initialY = e.clientY

		const handleMouseMove = (e: MouseEvent) => {
			const deltaX = e.clientX - initialX
			const deltaY = e.clientY - initialY

			let newWidth = Math.floor(width + deltaX)
			let newHeight = Math.floor(height + deltaY)
			if (newWidth <= minWidth) {
				newWidth = minWidth
			}
			if (newHeight <= minHeight) {
				newHeight = minHeight
			}
			if (newWidth >= maxWidth) {
				newWidth = maxWidth
			}
			if (newHeight >= maxHeight) {
				newHeight = maxHeight
			}
			changeSize(newWidth, newHeight)
		}

		const handleMouseUp = () => {
			document.removeEventListener('mousemove', handleMouseMove as any)
			document.removeEventListener('mouseup', handleMouseUp)
		}

		document.addEventListener('mousemove', handleMouseMove as any)
		document.addEventListener('mouseup', handleMouseUp)
	}
	return {
		onTouchStart,
		onMouseDown,
	}
}
