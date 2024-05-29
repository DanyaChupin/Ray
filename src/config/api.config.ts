import { filmQuantityCatalog } from '@/utils/constants'

export const API_URL = 'https://sandbox.api.video'
class AllUrls {
	getFilmById = (videoId: string) => {
		return `${API_URL}/videos/${videoId}`
	}
	getFilms = (page: string) => {
		return `${API_URL}/videos?currentPage=${page}&pageSize=${String(filmQuantityCatalog)}&sortBy=createdAt`
	}
	getFilmsBySearch = (slug: string) => {
		return `${API_URL}/videos?title=${slug}`
	}

	getFilmsByTag = () => {
		return `${API_URL}/videos?tags=previes`
	}
}

export const allUrls = new AllUrls()
