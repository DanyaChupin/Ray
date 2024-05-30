import { filmQuantityCatalog } from '@/utils/constants'

export const getFilmById = (videoId: string) => {
	return `/videos/${videoId}`
}
export const getFilms = (page: string) => {
	return `/videos?currentPage=${page}&pageSize=${String(filmQuantityCatalog)}&sortBy=createdAt`
}
export const getFilmsBySearch = (slug: string) => {
	return `/videos?title=${slug}`
}
export const getFilmsByTag = () => {
	return `/videos?tags=previes`
}
