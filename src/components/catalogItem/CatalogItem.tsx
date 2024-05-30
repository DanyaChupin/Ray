import Image from 'next/image'
import cn from 'classnames'
import Link from 'next/link'
import { IVideo } from '@/shared/types/video.type'
import styles from './CatalogItem.module.scss'
/**
 * Transliterates a Russian string to Latin characters.
 * @param {string} str - The input string in Russian.
 * @returns {string} - The transliterated string in Latin characters.
 */
function rus_to_latin(str: string): string {
	const ru: { [key: string]: string } = {
		а: 'a',
		б: 'b',
		в: 'v',
		г: 'g',
		д: 'd',
		е: 'e',
		ё: 'e',
		ж: 'j',
		з: 'z',
		и: 'i',
		к: 'k',
		л: 'l',
		м: 'm',
		н: 'n',
		о: 'o',
		п: 'p',
		р: 'r',
		с: 's',
		т: 't',
		у: 'u',
		ф: 'f',
		х: 'h',
		ц: 'c',
		ч: 'ch',
		ш: 'sh',
		щ: 'shch',
		ы: 'y',
		э: 'e',
		ю: 'u',
		я: 'ya',
		ъ: 'ie',
		ь: '',
		й: 'i',
	}
	const n_str: string[] = []

	for (let i = 0; i < str.length; ++i) {
		n_str.push(
			ru[str[i]] ||
				(ru[str[i].toLowerCase()] == undefined && str[i]) ||
				ru[str[i].toLowerCase()].replace(/^(.)/, (match: string) =>
					match.toUpperCase()
				)
		)
	}

	return n_str.join('').replace(/\.? /g, '-').toLowerCase()
}
export function CatalogItem({ film }: { film: IVideo }) {
	const title = film.title.toLowerCase()
	const author = film.description.toLowerCase()
	const link = 'luch.world/' + rus_to_latin(film.title)
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
