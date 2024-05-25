import { IVideoRespose } from '@/shared/types/video.type'

export function selectTransformation(searchData: IVideoRespose | undefined) {
	if (searchData) {
		return searchData.data.map((film) => ({
			text: film.title,
			to: '/catalog/' + film.videoId,
		}))
	}
	return
}
