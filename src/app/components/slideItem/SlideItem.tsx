import Image from 'next/image'
import { useResize } from '@/app/hooks/useResize'
import styles from './SlideItem.module.scss'

export function SlideItem() {
	const { isScreenLg } = useResize()
	return (
		<Image
			className={styles['slideItem']}
			width={isScreenLg ? 160 : 70}
			height={isScreenLg ? 100 : 54.71}
			src='/photo.jpeg'
			alt='photo'
		/>
	)
}
