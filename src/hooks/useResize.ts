'use client'
import { useState, useLayoutEffect } from 'react'
import {
	SCREEN_LG,
	SCREEN_MD,
	SCREEN_SM,
	SCREEN_XL,
	SCREEN_XXL,
} from '../utils/const-breakpoints'

interface ResizeHook {
	screenSize: { width: number; height: number }
	isScreenSm: boolean
	isScreenMd: boolean
	isScreenLg: boolean
	isScreenXl: boolean
	isScreenXxl: boolean
}

export function useResize(): ResizeHook {
	const [screenSize, setScreenSize] = useState({ width: 0, height: 0 })
	useLayoutEffect(() => {
		const handleResize = () => {
			if (window.innerWidth) {
				setScreenSize({ width: window.innerWidth, height: window.innerHeight })
				return
			}
		}

		handleResize()

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return {
		screenSize,
		isScreenSm: screenSize.width >= SCREEN_SM,
		isScreenMd: screenSize.width >= SCREEN_MD,
		isScreenLg: screenSize.width >= SCREEN_LG,
		isScreenXl: screenSize.width >= SCREEN_XL,
		isScreenXxl: screenSize.width >= SCREEN_XXL,
	}
}
