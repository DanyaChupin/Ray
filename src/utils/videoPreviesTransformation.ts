import { IVideo } from '@/shared/types/video.type'

export function videoPreviesTransformation(videoPrevies: IVideo[] | undefined) {
	if (videoPrevies) {
		return videoPrevies?.map((filmPrevies) => ({
			id: filmPrevies.videoId,
			poster: filmPrevies.assets.thumbnail,
			src: filmPrevies.assets.mp4,
			zIndex: 10,
		}))
	}
	return
}
