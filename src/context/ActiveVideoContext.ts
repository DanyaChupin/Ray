import {
	Dispatch,
	SetStateAction,
	createContext,
	useContext,
	useState,
} from 'react'
import { IVideo } from '@/shared/types/video.type'

export type IActiveVideo = {
	activeVideo: IVideo[]
	setActiveVideo: Dispatch<SetStateAction<IVideo[]>>
}

export const ActiveVideoContext = createContext<IActiveVideo>({
	activeVideo: [],
	setActiveVideo: () => {},
})

export const useActiveVideoContext = () => useContext(ActiveVideoContext)
