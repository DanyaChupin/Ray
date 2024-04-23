import Image from 'next/image'
import { useResize } from '@/hooks/useResize'
import styles from './SlideItem.module.scss'
import { useDrag } from 'react-dnd'

export function SlideItem() {
	const { isScreenMd } = useResize()
	return (
		<Image
			// ref={dragRef }
			className={styles['slideItem']}
			width={isScreenMd ? 160 : 70}
			height={isScreenMd ? 100 : 54.71}
			src='/photo.jpeg'
			alt='photo'
		/>
	)
}
