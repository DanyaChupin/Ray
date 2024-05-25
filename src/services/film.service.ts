import axios from 'axios'
import {
	getFilmById,
	getFilms,
	getFilmsBySearch,
	getFilmsByTag,
} from '../config/api.config'
import { IVideo, IVideoRespose } from '@/shared/types/video.type'

class FilmService {
	private API_KEY = '1evO4bgf2uiJGlmzsorurUN9zrOXOboAvLS8b27vM3T'

	async getById(videoId: string) {
		const response = await axios.get<IVideo>(getFilmById(videoId), {
			headers: { Authorization: 'Bearer ' + this.API_KEY },
		})
		return response.data
	}
	async getAll(page: string) {
		const response = await axios.get<IVideoRespose>(getFilms(page), {
			headers: {
				Authorization: 'Bearer ' + this.API_KEY,
			},
		})
		return response.data.data
	}

	async getBySearch(slug: string) {
		const response = await axios.get<IVideoRespose>(getFilmsBySearch(slug), {
			headers: {
				Authorization: 'Bearer ' + this.API_KEY,
			},
		})
		return response.data
	}
	async getByTag() {
		const response = await axios.get<IVideoRespose>(getFilmsByTag(), {
			headers: {
				Authorization: 'Bearer ' + this.API_KEY,
			},
		})
		return response.data.data
	}
}

export const filmService = new FilmService()
