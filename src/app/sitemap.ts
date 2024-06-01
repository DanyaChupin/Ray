import { getFilms } from '@/config/api.config'
import { IVideo } from '@/shared/types/video.type'
import { MetadataRoute } from 'next'
export async function generateSitemap() {
	try {
		const response = await fetch(
			process.env.NEXT_PUBLIC_BASE_API + getFilms('1'),
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN_KEY}`,
				},
			}
		)

		const res: { data: IVideo[] } = await response.json()
		const filmEntries: MetadataRoute.Sitemap = res.data.map((video) => ({
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/catalog/${video.videoId}`,
			lastModified: new Date(video.createdAt),
		}))
		return filmEntries
	} catch (error) {
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
}
export default async function sitemap(
	filmEntries: { url: string; lastModified: Date }[]
): Promise<MetadataRoute.Sitemap> {
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
