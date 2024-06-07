'use client'
import { IVideoPrevies } from '@/shared/types/video.type'
import { createContext, useState, ReactNode } from 'react'
type ActiveVideoContextType = {
	activeVideo: IVideoPrevies[]
	setActiveVideo: React.Dispatch<React.SetStateAction<IVideoPrevies[]>>
}

// create context
export const ActiveVideoContext = createContext<ActiveVideoContextType>({
	activeVideo: [],
	setActiveVideo: () => {},
})

export function ActiveVideoContextProvider({
	children,
}: {
	children: ReactNode
}) {
	const [activeVideo, setActiveVideo] = useState<IVideoPrevies[]>([])
	return (
		<ActiveVideoContext.Provider value={{ activeVideo, setActiveVideo }}>
			{children}
		</ActiveVideoContext.Provider>
	)
}
