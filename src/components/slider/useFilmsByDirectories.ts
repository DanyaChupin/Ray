import { useQuery } from '@tanstack/react-query'
import { FilmService } from '@/services/film.service'

export const useFilmsByDirectories = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['getByDirectories'],
		queryFn: () => FilmService.getByDirectories(),
	})

	return {
		data,
		isLoading,
		isError,
	}
}
