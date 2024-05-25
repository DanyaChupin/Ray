import { Dispatch, SetStateAction, createContext, useContext } from 'react'
import { IVideoPrevies } from '@/shared/types/video.type'

export type IActiveVideo = {
	activeVideo: IVideoPrevies[]
	setActiveVideo: Dispatch<SetStateAction<IVideoPrevies[]>>
}

export const ActiveVideoContext = createContext<IActiveVideo>({
	activeVideo: [],
	setActiveVideo: () => {},
})

export const useActiveVideoContext = () => useContext(ActiveVideoContext)
