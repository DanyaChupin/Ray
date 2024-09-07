import Film from '@/components/film/FIlm'

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
