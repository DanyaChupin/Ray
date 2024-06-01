import { IVideo, IVideoRespose } from '@/shared/types/video.type'
import axiosClassic from '@/api/interceptors'
import {
	getFilmById,
	getFilms,
	getFilmsBySearch,
	getFilmsByTag,
} from '@/config/api.config'

export const FilmService = {
	async getById(videoId: string) {
		const response = await axiosClassic.get<IVideo>(getFilmById(videoId))
		return response
	},
	async getAll(page: string) {
		const response = await axiosClassic.get<IVideoRespose>(getFilms(page))
		return response.data.data
	},

	async getBySearch(slug: string) {
		const response = await axiosClassic.get<IVideoRespose>(
			getFilmsBySearch(slug)
		)
		return response.data
	},
	async getByTag() {
		const response = await axiosClassic.get<IVideoRespose>(getFilmsByTag())
		return response.data.data
	},
}
