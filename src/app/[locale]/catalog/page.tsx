import { Header } from '@/components/header/Header'
import { Catalog } from '@/components/catalog/Catalog'
import styles from './CatalogPage.module.scss'
import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'
import { Locale } from '@/utils/localse'

export default function CatalogPage() {
	return (
		<>
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
		title: t('metadata.catalog'),
		description: t('metadata.description'),
	}
}
