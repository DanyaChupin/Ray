import { useInfiniteQuery } from '@tanstack/react-query'
import { FilmService } from '@/services/film.service'

export const useFilms = (search: string) => {
	const {
		data,
		isLoading,
		isError,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		refetch,
		error,
	} = useInfiniteQuery({
		queryKey: ['getFilms'],
		queryFn: async ({ pageParam }) => {
			const result = await FilmService.getAll(String(pageParam))
			return result
		},
		enabled: !search,
		refetchInterval: 600000,
		initialPageParam: 1,
		getNextPageParam: (_lastPage, _allPage, lastPageParam) => {
			return lastPageParam + 1
		},
	})
	return {
		data,
		refetch,
		isLoading,
		isError,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		error,
	}
}
