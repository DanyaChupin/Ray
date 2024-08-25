import { Header } from '@/components/header/Header'
import { Catalog } from '@/components/catalog/Catalog'
import styles from './CatalogPage.module.scss'
import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'
import { Locale } from '@/utils/localse'
import Head from 'next/head'

export default function CatalogPage() {
	return (
		<>
			<Head>
				<title>Luch world - фильмы</title>
				<meta
					name="description"
					content="ЛУЧ - фильмы от независмых авторов."
				/>
				<meta name="document-state" content="Static" />
				<meta
					property="og:title"
					content="Галерея независимых фильмов,свободных от строгих рамок."
				/>
				<meta property="og:type" content="website" />
				<meta property="og:image" content="https://luch.world/logo.svg" />
				<meta property="og:url" content="https://luch.world/catalog" />
				<meta property="vk:image" content="https://luch.world/logo.svg" />
				<meta property="fb:image" content="https://luch.world/logo.svg" />
				<meta property="twitter:image" content="https://luch.world/logo.svg" />
				<meta
					property="og:description"
					content="— это попытка консолидации и создания независимых фильмов,свободных от строгих рамок."
				/>
				<meta
					property="og:site_name"
					content="luch.world фильмы от независимых авторов"
				/>
				<link rel="canonical" href="https://luch.world/catalog" />
				<meta
					name="zen-verification"
					content="p92vrTS31hx9WbZfBBIZmSyRNNbXwDp2ErXqRRs7G9FiD7ec3YKaTtjpSPTiafX1"
				/>
				<meta
					name="keywords"
					content="независимое кино, инди кино, артхаус кино, андеграунд кинематография, независимые кинопроизводители, альтернативное кино, экспериментальное кино, низкобюджетное кино, сообщество независимых кинопроизводителей, нестандартное кино, смотреть онлайн, лучшие независимые кинопроизводители, независимое кино в России, андеграунд кинематография в мире, независимые кинопроизводители в сети"
				/>
			</Head>
			<Header />
			<section className={styles['catalog']}>
				<Catalog />
			</section>
		</>
	)
}
export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: Locale }
}): Promise<Metadata> {
	const t = await getTranslations({ locale, namespace: 'root' })

	return {
		description: t('metadata.description'),
	}
}
