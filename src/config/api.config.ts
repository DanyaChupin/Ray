export const API_URL = 'https://sandbox.api.video'

export const getFilmById = (videoId: string) => {
	return `${API_URL}/videos/${videoId}`
}
export const getFilms = (page: string) => {
	return `${API_URL}/videos?currentPage=${page}&pageSize=12&sortBy=createdAt`
}

export const getFilmsBySearch = (slug: string) => {
	return `${API_URL}/videos?title=${slug}`
}

export const getFilmsByTag = () => {
	return `${API_URL}/videos?tags=previes`
}
