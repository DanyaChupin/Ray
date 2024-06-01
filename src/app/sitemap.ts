import { getFilms } from '@/config/api.config'
import { IVideo } from '@/shared/types/video.type'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const response = await fetch(process.env.NEXT_PUBLIC_BASE_API + getFilms('1'))
	const data: { data: { data: IVideo[] } } = await response.json()
	console.log(data)
	if (!data.data) {
		return [
			{
				url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
			},
			{
				url: `${process.env.NEXT_PUBLIC_BASE_URL}/catalog`,
				lastModified: new Date(),
			},
		]
	}
	const filmEntries: MetadataRoute.Sitemap = data.data.data.map((video) => ({
		url: `${process.env.NEXT_PUBLIC_BASE_URL}/${video.videoId}`,
		lastModified: new Date(video.createdAt),
	}))
	return [
		{
			url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
		},
		{
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/catalog`,
			lastModified: new Date(),
		},
		...filmEntries,
	]
}
