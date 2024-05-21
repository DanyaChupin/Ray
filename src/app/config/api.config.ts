export const API_URL = 'https://api.kinescope.io'

export const getFilmById = (videoId: string) => {
	return `${API_URL}/v1/videos/${videoId}`
}
export const getFilms = (page: string, perPage: string) => {
	return `${API_URL}/v1/videos?page=${page}&per_page=${perPage}&order=created_at`
}

export const getFilmsBySearch = (
	page: string,
	perPage: string,
	slug: string
) => {
	return `${API_URL}/v1/videos?page=${page}&per_page=${perPage}&order=created_at&q=${slug}`
}
