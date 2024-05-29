import { useQuery } from '@tanstack/react-query'
import { FilmService } from '@/services/film.service'

export const useFilmSearch = (searchParam: string, key: string) => {
	const {
		data: searchData,
		isLoading: searchIsLoading,
		isError: searchIsError,
		refetch: searchRefetch,
		error: searchError,
	} = useQuery({
		queryKey: [key, searchParam],
		queryFn: () => FilmService.getBySearch(searchParam),
		enabled: !!searchParam,
	})
	return {
		searchIsError,
		searchRefetch,
		searchIsLoading,
		searchData,
		searchError,
	}
}
