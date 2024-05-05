import { useState } from 'react'
interface IResizableDiv {
	initWidth: number
	initHeight: number
}
export function useResizElem({ initWidth, initHeight }: IResizableDiv) {
	const [width, setWidth] = useState<number>(initWidth)
	const [height, setHeight] = useState<number>(initHeight)

	const resizeElem = (newWidth: number, newHeight: number) => {
		setWidth(newWidth)
		setHeight(newHeight)
	}

	return {
		width,
		height,
		resizeElem,
	}
}
