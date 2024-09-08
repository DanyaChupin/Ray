import Image from 'next/image'
import cn from 'classnames'
import Link from 'next/link'
import { IVideo } from '@/shared/types/video.type'
import styles from './CatalogItem.module.scss'

export function CatalogItem({ film }: { film: IVideo }) {
	const slug = film?.name.split('|')
	const title = slug[0]
	const author = slug[1]
	return (
		<Link href={`/films/${film.id}`} className={styles['catalogItem']}>
			<div className={styles['catalogItem__wrapper']}>
				<Image
					className={styles['catalogItem__img']}
					src={film.screenshot || film.screenshots[0]}
					width={160}
					height={90}
					layout="responsive"
					alt={film.name}
					priority
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
				</div>
				<p
					className={cn(styles['catalogItem__link'], {
						[styles['text']]: true,
					})}
				>
					{author}
				</p>
			</div>
		</Link>
	)
}
