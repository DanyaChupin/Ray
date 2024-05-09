import styles from './Logo.module.scss'
import cn from 'classnames'

const LOGOTEXT = 'ЛУЧ'

export function Logo({ catalogLogo }: { catalogLogo?: boolean }) {
	return (
		<h1
			className={cn(styles['logo'], {
				[styles['catalogLogo']]: catalogLogo,
			})}
		>
			{LOGOTEXT}
		</h1>
	)
}
