import Image from 'next/image'
import styles from './CatalogItem.module.scss'
import cn from 'classnames'

export function CatalogItem({ elem }: { elem: number }) {
	return (
		<div className={styles['catalogItem']}>
			<div className={styles['catalogItem__wrapper']}>
				<Image
					className={styles['catalogItem__img']}
					src="/photo.png"
					width={160}
					height={100}
					layout="responsive"
					alt="film"
				/>
			</div>
			<div className={styles['catalogItem__info']}>
				<p
					className={cn(styles['catalogItem__name'], {
						[styles['text']]: true,
					})}
				>
					Nike SB | Yuto Horigome in Tokyo
				</p>
				<p
					className={cn(styles['catalogItem__link'], {
						[styles['text']]: true,
					})}
				>
					luch.world/Nike-SB-|-Yuto-Horigome-in-Tokyo
				</p>
			</div>
		</div>
	)
}
