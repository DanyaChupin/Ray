import { allUrls } from './../config/api.config'

import { IVideo, IVideoRespose } from '@/shared/types/video.type'
import axiosClassic from '@/api/interceptors'

export const FilmService = {
	async getById(videoId: string) {
		const response = await axiosClassic.get<IVideo>(
			allUrls.getFilmById(videoId)
		)
		return response.data
	},
	async getAll(page: string) {
		const response = await axiosClassic.get<IVideoRespose>(
			allUrls.getFilms(page)
		)
		return response.data.data
	},

	async getBySearch(slug: string) {
		const response = await axiosClassic.get<IVideoRespose>(
			allUrls.getFilmsBySearch(slug)
		)
		return response.data
	},
	async getByTag() {
		const response = await axiosClassic.get<IVideoRespose>(
			allUrls.getFilmsByTag()
		)
		return response.data.data
	},
}
