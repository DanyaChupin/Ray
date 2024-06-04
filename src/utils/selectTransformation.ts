import { IVideo } from '@/shared/types/video.type'

export function selectTransformation(searchData: IVideo[] | undefined) {
	if (searchData) {
		return searchData.map((film) => ({
			text: `${film.name}  ${(film.description && ' | ' + film.description) || ''}`.toLowerCase(),
			to: '/catalog/' + film.id,
		}))
	}
	return
}
