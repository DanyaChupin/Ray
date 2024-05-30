import { useQuery } from '@tanstack/react-query'
import { FilmService } from '@/services/film.service'

export const useFilmsByTag = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['getByTag'],
		queryFn: () => FilmService.getByTag(),
	})

	return {
		data,
		isLoading,
		isError,
	}
}
