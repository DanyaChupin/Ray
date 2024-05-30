import { useTranslations } from 'next-intl'
import styles from './Logo.module.scss'
import cn from 'classnames'

export function Logo({ catalogLogo }: { catalogLogo?: boolean }) {
	const t = useTranslations('home')
	return (
		<h1
			className={cn(styles['logo'], {
				[styles['catalogLogo']]: catalogLogo,
			})}
		>
			{t('logo')}
		</h1>
	)
}
