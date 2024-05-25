export interface IVideoPrevies {
	id: string
	poster: string
	src: string
	zIndex: number
}
export interface IVideoRespose {
	data: IVideo[]
	pogination: {
		itemsTotal: number
	}
}
export interface IVideo {
	videoId: string
	title: string
	description: string
	public: boolean
	panoramic: boolean
	mp4Support: boolean
	publishedAt: Date
	createdAt: Date
	updatedAt: Date
	tags: any[]
	metadata: any[]
	source: IVideoSource
	assets: IVideoAssets
}

export interface IVideoAssets {
	iframe: string
	player: string
	hls: string
	thumbnail: string
	mp4: string
}

export interface IVideoSource {
	type: string
	uri: string
}
