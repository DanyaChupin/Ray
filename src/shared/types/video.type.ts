export interface IVideo {
	id: string
	title: string
	src: string
	zIndex: number
}
export interface IVideoRespose {
	data: IVideoR[]
}

export interface IVideoR {
	id: string
	project_id: string
	folder_id: null
	player_id: string
	version: number
	title: string
	subtitle: string
	description: string
	status: string
	progress: number
	duration: number
	assets: Asset[]
	chapters: Chapters
	privacy_type: string
	privacy_domains: any[]
	tags: any[]
	poster: Poster
	additional_materials: any[]
	additional_materials_enabled: boolean
	play_link: string
	embed_link: string
	created_at: Date
	updated_at: null
	subtitles: any[]
	subtitles_enabled: boolean
	hls_link: string
}

export interface Asset {
	id: string
	video_id: string
	original_name: string
	file_size: number
	md5?: string
	filetype: string
	quality: string
	resolution: string
	created_at: Date
	url: string
	download_link: string
}

export interface Chapters {
	items: any[]
	enabled: boolean
}
export interface Poster {
	id: string
	type: string
	media_id: string
	status: string
	active: boolean
	original: string
	md: string
	sm: string
	xs: string
	from_time: number
	to_time: number
}
