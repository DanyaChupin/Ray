import { useQuery } from '@tanstack/react-query'
import { filmService } from '@/services/film.service'

export const useFilmsByTag = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['getByTag'],
		queryFn: () => filmService.getByTag(),
	})
	return {
		data,
		isLoading,
		isError,
	}
}
