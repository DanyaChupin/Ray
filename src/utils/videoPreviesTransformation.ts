'use client'
import { IVideo } from '@/shared/types/video.type'
import { filmQuantityPrevies } from './constants'
function getRandomObjects(arr: IVideo[]) {
	const shuffled = arr
		.sort(() => 0.5 - Math.random())
		.slice(0, filmQuantityPrevies)
	return shuffled
}
export const videoPreviesTransformation = (videoPrevies: IVideo[]) => {
	if (videoPrevies) {
		const randomVideos = getRandomObjects(videoPrevies)
		const randomPreviesVideo = randomVideos.map((filmPrevies) => ({
			id: String(filmPrevies.id),
			poster: filmPrevies.screenshots[0],
			src: filmPrevies.hls_url,
			zIndex: 10,
		}))

		return randomPreviesVideo
	}
	return
}
