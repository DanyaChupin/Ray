import { IDirectories, IVideo } from '@/shared/types/video.type'
import axiosClassic from '@/api/interceptors'
import {
	getFilmById,
	getFilms,
	getFilmsBySearch,
	getFilmsByDirectories,
} from '@/config/api.config'

export const FilmService = {
	async getById(videoId: string) {
		const response = await axiosClassic.get<IVideo>(getFilmById(videoId))
		return response.data
	},
	async getAll(page: string) {
		const response = await axiosClassic.get<IVideo[]>(getFilms(page))
		return response.data
	},

	async getBySearch(slug: string) {
		const response = await axiosClassic.get<IVideo[]>(getFilmsBySearch(slug))
		return response.data
	},
	async getByDirectories() {
		const response = await axiosClassic.get<IDirectories>(
			getFilmsByDirectories()
		)
		return response.data.directory.items
	},
}
