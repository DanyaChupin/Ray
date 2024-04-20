import Image from 'next/image'
import { useResize } from '@/app/hooks/useResize'
import styles from './SlideItem.module.scss'

export function SlideItem() {
	const { isScreenMd } = useResize()
	return (
		<Image
			className={styles['slideItem']}
			width={isScreenMd ? 160 : 70}
			height={isScreenMd ? 100 : 54.71}
			src='/photo.jpeg'
			alt='photo'
		/>
	)
}
