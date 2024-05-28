import { filmQuantityCatalog } from '@/utils/constants'

class AllUrls {
	private API_URL = 'https://sandbox.api.video'

	getFilmById = (videoId: string) => {
		return `${this.API_URL}/videos/${videoId}`
	}
	getFilms = (page: string) => {
		return `${this.API_URL}/videos?currentPage=${page}&pageSize=${String(filmQuantityCatalog)}&sortBy=createdAt`
	}
	getFilmsBySearch = (slug: string) => {
		return `${this.API_URL}/videos?title=${slug}`
	}

	getFilmsByTag = () => {
		return `${this.API_URL}/videos?tags=previes`
	}
}

export const allUrls = new AllUrls()
