import axiosClassic from '@/api/interceptors'
import Film from '@/components/film/FIlm'
import { getFilmById } from '@/config/api.config'
import { IVideo } from '@/shared/types/video.type'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export default function FilmPage({
	params: { videoId },
}: {
	params: { videoId: string }
}) {
	return (
		<>
			<Film params={{ videoId }} />
		</>
	)
}
export async function generateMetadata({
	params: { videoId },
}: {
	params: { videoId: string }
}): Promise<Metadata> {
	try {
		const response = await axiosClassic.get<IVideo>(getFilmById(videoId))
		return {
			title: response.data.title,
			description: response.data.description,
			openGraph: {
				images: [
					{
						url: response.data.assets.thumbnail,
					},
				],
			},
		}
	} catch (error) {
		notFound()
	}
}
