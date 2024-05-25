import Image from 'next/image'
import cn from 'classnames'
import Link from 'next/link'
import { IVideo } from '@/shared/types/video.type'
import styles from './CatalogItem.module.scss'

export function CatalogItem({ film }: { film: IVideo }) {
	const title = film.title.toLowerCase()
	const author = film.description.toLowerCase()
	const link = ('luch.world/' + film.title).replace(/\.? /g, '-').toLowerCase()
	return (
		<Link href={`/catalog/${film.videoId}`} className={styles['catalogItem']}>
			<div className={styles['catalogItem__wrapper']}>
				<Image
					className={styles['catalogItem__img']}
					src={film.assets.thumbnail}
					width={160}
					height={90}
					layout="responsive"
					alt={film.title}
				/>
			</div>
			<div className={styles['catalogItem__info']}>
				<div className={styles['catalogItem__name']}>
					<p
						className={cn(styles['catalogItem__title'], {
							[styles['text']]: true,
						})}
					>
						{title}
					</p>
					{author && (
						<>
							<span className={styles['catalogItem__line']}>|</span>
							<p
								className={cn(styles['catalogItem__author'], {
									[styles['text']]: true,
								})}
							>
								{author}
							</p>
						</>
					)}
				</div>
				<p
					className={cn(styles['catalogItem__link'], {
						[styles['text']]: true,
					})}
				>
					{link}
				</p>
			</div>
		</Link>
	)
}
