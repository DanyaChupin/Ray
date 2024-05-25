import { useQuery } from '@tanstack/react-query'
import { filmService } from '@/services/film.service'

export const useFilmSearch = (searchParam: string, key: string) => {
	const {
		data: searchData,
		isLoading: searchIsLoading,
		isError: searchIsError,
		refetch: searchRefetch,
		error: searchError,
	} = useQuery({
		queryKey: [key, searchParam],
		queryFn: () => filmService.getBySearch(searchParam),
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
