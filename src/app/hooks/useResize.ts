'use client'
import { useState, useEffect } from 'react'
import {
	SCREEN_LG,
	SCREEN_MD,
	SCREEN_SM,
	SCREEN_XL,
	SCREEN_XXL,
} from '../utils/const-breakpoints'

interface ResizeHook {
	width: number
	isScreenSm: boolean
	isScreenMd: boolean
	isScreenLg: boolean
	isScreenXl: boolean
	isScreenXxl: boolean
}

export function useResize(): ResizeHook {
	const [width, setWidth] = useState<number>(window.innerWidth)
	console.log(width)
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth) {
				setWidth(window.innerWidth)
			}
		}

		handleResize()

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return {
		width,
		isScreenSm: width >= SCREEN_SM,
		isScreenMd: width >= SCREEN_MD,
		isScreenLg: width >= SCREEN_LG,
		isScreenXl: width >= SCREEN_XL,
		isScreenXxl: width >= SCREEN_XXL,
	}
}
