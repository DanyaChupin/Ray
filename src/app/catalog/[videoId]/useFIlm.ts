import { filmService } from '@/services/film.service'
import { useQuery } from '@tanstack/react-query'

export const useFilm = (videoId: string) => {
	const { data, isLoading, error } = useQuery({
		queryKey: ['film', videoId],
		queryFn: () => filmService.getById(videoId),
	})
	return { data, isLoading, error }
}
