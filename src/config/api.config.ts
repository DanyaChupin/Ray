import { filmQuantityCatalog } from '@/utils/constants'

export const getFilmById = (videoId: string) => {
	return `/streaming/vod/videos/${videoId}`
}
export const getFilms = (page: string) => {
	return `/streaming/vod/videos?page=${page}&per_page=${filmQuantityCatalog}`
}
export const getFilmsBySearch = (slug: string) => {
	return `/streaming/vod/videos/search?q=${slug}`
}
export const getFilmsByDirectories = () => {
	return `/streaming/directories/29246`
}
