import axios from 'axios'
import { getFilmById, getFilms, getFilmsBySearch } from '../config/api.config'
import { IVideoRespose } from '@/shared/types/video.type'

export const API_KEY = 'a19758d0-d1c1-4861-8856-b4ae9a4c6444'
export const FilmService = {
	async getById(videoId: string) {
		return await axios.get<IVideoRespose>(getFilmById(videoId), {
			headers: { Authorization: 'Bearer ' + API_KEY },
		})
	},
	async getByPage(page: string, perPage: string) {
		return await axios.get<IVideoRespose>(getFilms(page, perPage), {
			headers: {
				Authorization: 'Bearer ' + API_KEY,
				mode: 'cors',
			},
		})
	},
	async getBySearch(page: string, perPage: string, slug: string) {
		return await axios.get<IVideoRespose>(getFilmsBySearch(page, perPage, slug))
	},
}
