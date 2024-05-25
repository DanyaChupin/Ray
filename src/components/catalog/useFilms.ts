import { useInfiniteQuery } from '@tanstack/react-query'
import { filmService } from '@/services/film.service'

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
			const result = await filmService.getAll(String(pageParam))
			return result
		},
		enabled: !search,
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
