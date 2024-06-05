export interface IVideoPrevies {
	id: string
	poster: string
	src: string
	zIndex: number
}
export interface IDirectories {
	directory: {
		items: IVideo[]
	}
}
export interface IVideo {
	id: number
	name: string
	description: string
	client_id: number
	screenshot: string
	hls_url: string
	dash_url: string
	duration: number
	slug: string
	origin_size: number
	origin_host: string
	origin_resource: string
	created_at: Date
	updated_at: Date
	origin_height: number
	screenshots: string[]
	screenshot_id: number
	sprite: string
	ad_id: number
	projection: string
	status: string
	client_user_id: number
	stream_id: number
}
