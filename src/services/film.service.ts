import { allUrls } from './../config/api.config'
import axios from 'axios'

import { IVideo, IVideoRespose } from '@/shared/types/video.type'

class FilmService {
	private API_KEY = '1evO4bgf2uiJGlmzsorurUN9zrOXOboAvLS8b27vM3T'

	async getById(videoId: string) {
		const response = await axios.get<IVideo>(allUrls.getFilmById(videoId), {
			headers: { Authorization: 'Bearer ' + this.API_KEY },
		})
		return response.data
	}
	async getAll(page: string) {
		const response = await axios.get<IVideoRespose>(allUrls.getFilms(page), {
			headers: {
				Authorization: 'Bearer ' + this.API_KEY,
			},
		})
		return response.data.data
	}

	async getBySearch(slug: string) {
		const response = await axios.get<IVideoRespose>(
			allUrls.getFilmsBySearch(slug),
			{
				headers: {
					Authorization: 'Bearer ' + this.API_KEY,
				},
			}
		)
		return response.data
	}
	async getByTag() {
		const response = await axios.get<IVideoRespose>(allUrls.getFilmsByTag(), {
			headers: {
				Authorization: 'Bearer ' + this.API_KEY,
			},
		})
		return response.data.data
	}
}

export const filmService = new FilmService()
