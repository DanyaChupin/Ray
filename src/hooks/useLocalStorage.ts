/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import { IOption } from '@/shared/types/options.type'
import { useState, useEffect } from 'react'

export function useLocalStorage(
	key: string
): [IOption[], (newValue: IOption) => void, (value: IOption[]) => void] {
	const [searchStory, setSearchStory] = useState<IOption[]>([])

	useEffect(() => {
		const storyValue = localStorage.getItem(key)
		if (storyValue) setSearchStory(JSON.parse(storyValue))
	}, [])

	const addSearchStory = (newValue: IOption) => {
		const isValueInArray = searchStory.some(
			(item) => item.text === newValue.text.toLowerCase()
		)
		if (!isValueInArray) {
			localStorage.setItem(
				key,
				JSON.stringify([newValue, ...searchStory.slice(0, 4)])
			)
			setTimeout(() => {
				setSearchStory((prev) => [newValue, ...prev].slice(0, 5))
			}, 500)
		}
	}
	const removeSearchStory = (value: IOption[]) => {
		localStorage.setItem(key, JSON.stringify(value))
		setSearchStory(value)
	}

	return [searchStory, addSearchStory, removeSearchStory]
}
