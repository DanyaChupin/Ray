import { FilmService } from '@/services/film.service'
import { useQuery } from '@tanstack/react-query'

export const useFilm = (videoId: string) => {
	const { data, isLoading, error } = useQuery({
		queryKey: ['film', videoId],
		queryFn: () => FilmService.getById(videoId),
	})
	return { data, isLoading, error }
}
