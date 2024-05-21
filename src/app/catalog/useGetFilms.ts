'use client'
import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { FilmService } from '../services/film.service'

export const useGetFilms = () => {
	const { data, error, isLoading } = useQuery({
		queryKey: ['films'],
		queryFn: () => FilmService.getByPage('1', '9'),
	})
	return useMemo(
		() => ({
			data,
			error,
			isLoading,
		}),
		[data, error, isLoading]
	)
}
