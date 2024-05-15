import { Logo } from '@/components/Logo/Logo'
import styles from './Loading.module.scss'

export default function LoadingPage() {
	return (
		<div className={styles['loading']}>
			<Logo />
		</div>
	)
}
