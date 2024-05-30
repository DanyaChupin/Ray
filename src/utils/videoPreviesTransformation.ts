import { IVideo } from '@/shared/types/video.type'
import { filmQuantityPrevies } from './constants'

export function videoPreviesTransformation(videoPrevies: IVideo[] | undefined) {
	if (videoPrevies) {
		return videoPrevies?.map((filmPrevies) => ({
			id: filmPrevies.videoId,
			poster: filmPrevies.assets.thumbnail,
			src: filmPrevies.assets.mp4,
			zIndex: 10,
		})).slice(0, filmQuantityPrevies)
	}
	return
}
